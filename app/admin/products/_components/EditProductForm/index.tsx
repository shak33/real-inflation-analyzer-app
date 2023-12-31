"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RenderProperInput } from "@/components/RenderProperInput";

import { usePatchProduct } from "@/hooks/products/usePatchProduct";

import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";
import { formSchema, formStructure } from "./constants";

interface EditProductFormProps {
  data: UseQueryResult<ProductsTableProduct>;
}

export const EditProductForm = ({ data }: EditProductFormProps) => {
  const patchProduct = usePatchProduct();
  const productData = data.data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: productData
      ? {
          name: productData.name,
          shortName: productData.shortName,
          barcode: productData.barcode,
          companyId: productData.company.id,
        }
      : {
          name: "",
          shortName: "",
          barcode: "",
          companyId: "",
        },
  });

  const onSubmit = (postData: z.infer<typeof formSchema>) => {
    patchProduct.mutate({
      productId: productData?.id!,
      postData,
    });
  };

  if (patchProduct.isLoading) {
    return (
      <div>
        Updating product {form.getValues("name")} in the system, please wait...
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full mb-24"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row justify-between">
          <div className="basis-1/2">
            {formStructure.map(
              ({ name, label, type, description }, index) => {
                return (
                  <FormField
                    control={form.control}
                    key={`${name}-${index}`}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem className={type === "file" ? "hidden" : ""}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <RenderProperInput
                            field={field}
                            form={form}
                            name={name}
                            type={type}
                          />
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              },
            )}
            <Button type="submit" className="w-full mt-2">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

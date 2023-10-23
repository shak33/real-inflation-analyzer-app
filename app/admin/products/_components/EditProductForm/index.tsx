"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
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

import { Product } from "@/interfaces/Product";
import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";

import { RenderProperInput } from "../RenderProperInput";

import { formSchema, editFormStructureLeft } from "../../constants";

interface EditProductFormProps {
  data: UseQueryResult<ProductsTableProduct>;
}

export const EditProductForm = ({ data }: EditProductFormProps) => {
  const productData = data.data;
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: productData ? {
      name: productData.name,
      shortName: productData.shortName,
      barcode: productData.barcode,
      companyId: productData.company.id
    } : {
      name: "",
      shortName: "",
      barcode: "",
      companyId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (postData: Product) => {
      return axios.post("/api/admin/products", postData);
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (mutation.isLoading) {
    return <div>Updating product {form.getValues("name")} in the system. Please wait...</div>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full mb-24"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row justify-between">
          <div className="basis-1/2">
            {editFormStructureLeft.map(
              ({ name, label, type, description }, index) => {
                return (
                  <FormField
                    control={form.control}
                    key={`${name}-${index}`}
                    name={name as keyof Product}
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

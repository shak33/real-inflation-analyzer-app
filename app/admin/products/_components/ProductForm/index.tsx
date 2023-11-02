"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ImageUpload } from "@/components/ImageUpload";

import { useGetReceiptFromDate } from "@/hooks/receipts/useGetReceiptByDate";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";

import { RenderProperInput } from "@/components/RenderProperInput";
import { UploadedReceipts } from "@/app/admin/products/_components/UploadedReceipts";

import {
  formSchema,
  formStructureLeft,
  formStructureRight,
} from "./constants";

export const ProductForm = () => {
  const { receipts, updateReceipts } = useGetReceiptFromDate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
      price: "0",
      priceWithDiscount: false,
      barcode: "",
      date: new Date(),
      companyId: "",
      receiptImage: "",
    },
  });
  const createProduct = useCreateProduct(form);
  const date = form.watch("date");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProduct.mutate(values);
  };

  const removeReceipt = () => {
    form.setValue("receiptImage", "");
  }

  useEffect(() => {
    updateReceipts(date);
  }, [date, updateReceipts]);

  if (createProduct.isLoading) {
    return <div>Adding product to the system, please wait...</div>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full mb-24"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row justify-between">
          <div className="basis-1/2">
            {formStructureLeft.map(
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
          <div className="basis-1/4">
            {formStructureRight.map(
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
            <p>Upload a photo of the receipt</p>
            <ImageUpload
              onChange={(value) => {
                form.setValue("receiptImage", value);
              }}
              value={form.watch("receiptImage")}
            />
            {form.getValues("receiptImage") ? (
              <Button
                variant="destructive"
                className="w-full mt-2"
                onClick={removeReceipt}
              >
                Remove receipt photo
              </Button>
            ) : null}
            {receipts?.length > 0 ? (
              <>
                <p>or choose one of the receipts you&apos;ve uploaded matching selected date</p>
                <UploadedReceipts
                  receipts={receipts}
                  onChange={(value) => {
                    form.setValue("receiptImage", value);
                  }}
                  value={form.watch("receiptImage")}
                />
              </>
            ) : null}
          </div>
        </div>
      </form>
    </Form>
  );
};

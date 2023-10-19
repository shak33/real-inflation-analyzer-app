"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
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

import { Product } from "@/interfaces/Product";

import { RenderProperInput } from "./RenderProperInput";

import { formSchema, formStructure } from "../constants";

export const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
      price: 0,
      priceWithDiscount: false,
      barcode: "",
      date: new Date(),
      companyId: "",
      receiptImage: "",
    },
  });
  const mutation = useMutation((postData: Product) => {
    return axios.post("/api/admin/products", postData).then((response) => {
      form.reset();
    });
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (mutation.isLoading) {
    return <div>Adding product to the system. Please wait...</div>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formStructure.map(({ name, label, type, description }, index) => {
          return (
            <FormField
              control={form.control}
              key={`${name}-${index}`}
              name={name as keyof Product}
              render={({ field }) => (
                <FormItem
                  className={type === "file" ? "hidden" : ""}
                >
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
        })}
        <ImageUpload
          onChange={(value) => {
            form.setValue("receiptImage", value);
          }}
          value={form.watch("receiptImage")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import { RenderProperInput } from "@/components/RenderProperInput";

import {
  formSchema,
  formStructureLeft,
  formStructureRight,
} from "./constants";

export const ProductForm = () => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: (postData: z.infer<typeof formSchema>) => {
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
    return <div>Adding product to the system. Please wait...</div>;
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
            <ImageUpload
              onChange={(value) => {
                form.setValue("receiptImage", value);
              }}
              value={form.watch("receiptImage")}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

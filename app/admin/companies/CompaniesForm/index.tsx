"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ImageUpload";

import { Company } from "@/interfaces/Company";

import { formSchema, formStructure } from "../constants";

export const CompaniesForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (postData: Company) => {
      return axios.post("/api/admin/companies", postData);
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (mutation.isLoading) {
    return <p>Adding company to the system. Please wait...</p>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full mb-8"
        onSubmit={form.handleSubmit(onSubmit)}
        data-testid="companies-form"
      >
        {formStructure.map(({ name, label, type }, index) => {
          return (
            <FormField
              control={form.control}
              key={`${name}-${index}`}
              name={name as keyof Company}
              render={({ field }) => (
                <FormItem className={type === "file" ? "hidden" : ""}>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <ImageUpload
          onChange={(value) => {
            form.setValue("logo", value);
          }}
          value={form.watch("logo")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

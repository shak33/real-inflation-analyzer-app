"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Modal from "@/components/modals/Modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RenderProperInput } from "@/components/RenderProperInput";
import { ImageUpload } from "@/components/ImageUpload";

import { useEditProductHistoryModal } from "@/hooks/useEditProductHistoryModal";

import { Product } from "@/interfaces/Product";

interface EditProductHistoryModalProps {
  data: any;
  formSchema: any;
  formStructure: any;
}

export const EditProductHistoryModal:React.FC<EditProductHistoryModalProps> = ({
  data,
  formSchema,
  formStructure,
}) => {
  const editProductHistoryModal = useEditProductHistoryModal();

  console.log(new Date(data.date));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: data.price,
      priceWithDiscount: data.priceWithDiscount,
      date: data.date,
      receiptImage: data.receiptImage,
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
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
        <FormField
          control={form.control}
          name="receiptImage"
          render={() => (
            <FormItem>
              <FormLabel>Receipt image</FormLabel>
              <FormControl>
                <ImageUpload
                  onChange={(value) => {
                    form.setValue("receiptImage", value);
                  }}
                  value={form.watch("receiptImage")}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">

    </div>
  );

  return (
    <Modal
      isOpen={editProductHistoryModal.isOpen}
      title="Edit product history"
      onClose={editProductHistoryModal.closeModal}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Modal from "@/components/modals/Modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RenderProperInput } from "@/components/RenderProperInput";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";

import { useEditProductHistoryModal } from "@/hooks/useEditProductHistoryModal";

import { ProductPriceHistory } from "@prisma/client";
import { formSchema, formStructure } from "./constants";

interface EditProductHistoryModalProps {
  data: ProductPriceHistory;
}

export const EditProductHistoryModal:React.FC<EditProductHistoryModalProps> = ({
  data,
}) => {
  const editProductHistoryModal = useEditProductHistoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: data.price,
      priceWithDiscount: data.priceWithDiscount,
      date: new Date(data.date),
      receiptImage: data.receiptImage || '',
    },
  });

  const removeReceiptImage = () => {
    form.setValue("receiptImage", "");
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        {formStructure.map(({ name, label, type, description }, index) => {
          return (
            <FormField
              control={form.control}
              key={`${name}-${index}`}
              name={name as keyof z.infer<typeof formSchema>}
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
        <div className="flex gap-4">
          {form.watch("receiptImage") ? <div className="basis-1/2">
            <Image
              src={form.watch("receiptImage")}
              width={200}
              height={200}
              alt="Receipt image"
            />
            <Button
              variant="destructive"
              onClick={removeReceiptImage}
            >
              Remove receipt image
            </Button>
          </div> : null}
          <FormField
            control={form.control}
            name="receiptImage"
            render={() => (
              <FormItem
                className="basis-1/2"
              >
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
        </div>
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
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

import { useAddEditProductHistoryModal } from "@/hooks/useAddEditProductHistoryModal";

import { ProductPriceHistory } from "@prisma/client";
import { formSchema, formStructure } from "./constants";

interface EditProductHistoryModalProps {
  data?: ProductPriceHistory;
  onSave: (values: z.infer<typeof formSchema>) => void;
}

export const AddEditProductHistoryModal:React.FC<EditProductHistoryModalProps> = ({
  data,
  onSave
}) => {
  const addEditProductHistoryModal = useAddEditProductHistoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: !data ? {
      price: 0,
      priceWithDiscount: false,
      date: new Date(),
      receiptImage: '',
      } : {
      price: data.price,
      priceWithDiscount: data.priceWithDiscount,
      date: new Date(data.date),
      receiptImage: data.receiptImage || '',
    },
  });

  const removeReceiptImage = () => {
    form.setValue("receiptImage", "");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  const bodyContent = (
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
        <hr />
        <div className="flex flex-col gap-4 mt-3">
          <Button
            type="submit"
          >
            {data ? "Update price history" : "Add price history"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <Modal
      isOpen={addEditProductHistoryModal.isOpen}
      title={!data ? "Add price history" : "Edit product history"}
      onClose={addEditProductHistoryModal.closeModal}
      body={bodyContent}
    />
  )
}
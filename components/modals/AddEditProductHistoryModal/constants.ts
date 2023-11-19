import * as z from "zod";

export const formSchema = z.object({
  price: z.string().min(0, {
    message: "Price must be at least 0",
  }),
  priceWithDiscount: z.boolean(),
  date: z.date(),
  receiptImage: z.string(),
});

export const formStructure = [
  {
    name: "price",
    label: 'Price',
    type: "input",
    description: "",
  },
  {
    name: "priceWithDiscount",
    label: 'Price with discount',
    type: "switch",
    description: "",
  },
  {
    name: "date",
    label: 'Date',
    type: "calendar",
    description: "",
  },
  {
    name: "receiptImage",
    label: 'Receipt Image',
    type: "file",
    description: "",
  },
];
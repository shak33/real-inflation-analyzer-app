import * as z from "zod";

export const formSchema = z.object({
  shortName: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255, {
      message: "Name must be at most 255 characters long",
    }),
  name: z.string(),
  price: z.number().min(0, {
    message: "Price must be at least 0",
  }),
  priceWithDiscount: z.boolean(),
  barcode: z.string(),
  date: z.date(),
  companyId: z.string().min(1, {
    message: "Company must be selected",
  }),
  receiptImage: z.string(),
});

export const formStructureLeft = [
  {
    name: "shortName",
    label: "Short name",
    type: "input",
    description: "",
  },
  {
    name: "name",
    label: "Name",
    type: "input",
    description: "",
  },
  {
    name: "companyId",
    label: "Company",
    type: "select",
    description: "",
  },
  {
    name: "barcode",
    label: "Barcode",
    type: "input",
    description: "",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    description: "",
  },
  {
    name: "priceWithDiscount",
    label: "Price with discount",
    type: "switch",
    description: "",
  },
];

export const formStructureRight = [
  {
    name: "date",
    label: "Date",
    type: "calendar",
    description: "Choose date when product was purchased",
  },
  {
    name: "receiptImage",
    label: "Receipt image",
    type: "file",
    description: "",
  },
]
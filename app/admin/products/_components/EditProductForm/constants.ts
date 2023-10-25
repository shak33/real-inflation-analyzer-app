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
  barcode: z.string(),
  companyId: z.string(),
});

export const formStructure = [
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
];
import { Company } from "@prisma/client";

interface PriceHistory {
  price: number;
  priceWithoutDiscount: boolean;
}

export interface ProductsTableProduct {
  id: string;
  shortName: string;
  name: string;
  company: Company;
  barcode: string;
  date: string;
  priceHistory: PriceHistory[]
  priceWithDiscount: number;
}
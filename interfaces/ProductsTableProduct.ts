interface PriceHistory {
  price: number;
  priceWithoutDiscount: boolean;
}

export interface ProductsTableProduct {
  id: string;
  shortName: string;
  name: string;
  barcode: string;
  priceHistory: PriceHistory[]
  priceWithDiscount: number;
}
"use client";

import { CustomTable } from "@/components/Table";

import { ProductPriceHistory } from "@prisma/client";

interface PriceHistoryTableProps {
  data: ProductPriceHistory[];
}

export const PriceHistoryTable = ({
  data,
} : PriceHistoryTableProps) => {
  const tableHead = ['Price', 'Price with discount', 'Date', 'Receipt'];

  const tableBody = data.map(({price, priceWithDiscount, date, receiptImage} : ProductPriceHistory) => {
    return [
      price,
      priceWithDiscount,
      date,
      receiptImage,
    ];
  });

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
    />
  )
}
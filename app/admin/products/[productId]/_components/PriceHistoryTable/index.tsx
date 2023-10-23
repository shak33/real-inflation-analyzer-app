"use client";

import { useEditRow } from "@/hooks/useEditRow";

import { CustomTable } from "@/components/Table";

import { ProductPriceHistory } from "@prisma/client";

interface PriceHistoryTableProps {
  data: ProductPriceHistory[];
}

export const PriceHistoryTable = ({
  data,
} : PriceHistoryTableProps) => {
  const { setEditRow } = useEditRow();
  const tableHead = ['Price', 'Price with discount', 'Date', 'Receipt'];

  const tableBody = data.map(({id, price, priceWithDiscount, date, receiptImage} : ProductPriceHistory) => ({
    id,
    price,
    priceWithDiscount,
    date,
    receiptImage,
  }));

  const onEditClick = (rowId: string) => {
    setEditRow(rowId);
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onEditClick={onEditClick}
    />
  )
}
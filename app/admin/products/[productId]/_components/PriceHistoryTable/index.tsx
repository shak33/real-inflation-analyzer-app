"use client";

import { CustomTable } from "@/components/Table";

import { ProductPriceHistory } from "@prisma/client";

import { formSchema, formStructure } from "./constants";

import { EditProductHistoryModal } from "@/components/modals/EditProductHistoryModal";

import { useEditProductHistoryModal } from "@/hooks/useEditProductHistoryModal";

interface PriceHistoryTableProps {
  data: ProductPriceHistory[];
}

export const PriceHistoryTable = ({
  data,
} : PriceHistoryTableProps) => {
  const editProductHistoryModal = useEditProductHistoryModal();
  const tableHead = ['Price', 'Price with discount', 'Date', 'Receipt'];
  const tableBody = data.map(({id, price, priceWithDiscount, date, receiptImage} : ProductPriceHistory) => ({
    id,
    price,
    priceWithDiscount,
    date: new Date(date).toLocaleDateString(),
    receiptImage,
  }));

  const onEditClick = (rowId: string) => {
    editProductHistoryModal.setEditedRow(rowId);
    editProductHistoryModal.openModal();
  }

  console.log(data);

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        tableBody={tableBody}
        onEditClick={onEditClick}
      />
      <EditProductHistoryModal
        data={data}
        formSchema={formSchema}
        formStructure={formStructure}
      />
    </>
  )
}
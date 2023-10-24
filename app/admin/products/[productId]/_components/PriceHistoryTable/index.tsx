"use client";

import { CustomTable } from "@/components/Table";
import { EditProductHistoryModal } from "@/components/modals/EditProductHistoryModal";

import { ProductPriceHistory } from "@prisma/client";

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
    priceWithDiscount: priceWithDiscount ? 'Yes' : 'No',
    date: new Date(date).toLocaleDateString(),
    receiptImage,
  }));
  const filteredData = data.find(({ id } : ProductPriceHistory) => id === editProductHistoryModal.editedId);

  const onEditClick = (rowId: string) => {
    editProductHistoryModal.setEditedRow(rowId);
    editProductHistoryModal.openModal();
  }

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        tableBody={tableBody}
        onEditClick={onEditClick}
      />
      {filteredData ? (
        <EditProductHistoryModal
          data={filteredData}
        />
      ) : null}
    </>
  )
}
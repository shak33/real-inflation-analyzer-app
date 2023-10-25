"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  const queryClient = useQueryClient();
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

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/admin/products/${id}/price-history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  })

  const onRemoveClick = (id: string) => {
    removeMutation.mutate(id);
  }

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        tableBody={tableBody}
        onEditClick={onEditClick}
        onRemoveClick={onRemoveClick}
      />
      {filteredData ? (
        <EditProductHistoryModal
          data={filteredData}
        />
      ) : null}
    </>
  )
}
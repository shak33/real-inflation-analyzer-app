"use client";

import { useCallback, useMemo } from "react";
import * as z from "zod";

import { CustomTable } from "@/components/Table";
import { AddEditProductHistoryModal } from "@/components/modals/AddEditProductHistoryModal";
import { Button } from "@/components/ui/button";

import { ProductPriceHistory } from "@prisma/client";

import { useAddEditProductHistoryModal } from "@/hooks/useAddEditProductHistoryModal";
import { useRemovePriceHistory } from "@/hooks/products/priceHistory/useRemovePriceHistory";
import { useAddPriceHistory } from "@/hooks/products/priceHistory/useAddPriceHistory";

import { formSchema } from "@/components/modals/AddEditProductHistoryModal/constants";

interface PriceHistoryTableProps {
  data: ProductPriceHistory[];
  productId: string;
}

export const PriceHistoryTable = ({
  data,
  productId,
} : PriceHistoryTableProps) => {
  const removePriceHistory = useRemovePriceHistory();
  const addPriceHistory = useAddPriceHistory();
  const addEditProductHistoryModal = useAddEditProductHistoryModal();
  const tableHead = ['Price', 'Price with discount', 'Date', 'Receipt'];

  const tableBody = useMemo(() => {
    return data.map(({id, price, priceWithDiscount, date, receiptImage} : ProductPriceHistory) => ({
      id,
      price,
      priceWithDiscount: priceWithDiscount ? 'Yes' : 'No',
      date: new Date(date).toLocaleDateString(),
      receiptImage,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return data.find(({ id } : ProductPriceHistory) => id === addEditProductHistoryModal.editedId);
  }, [data, addEditProductHistoryModal.editedId]);

  const onEditClick = useCallback((rowId: string) => {
    addEditProductHistoryModal.setEditedRow(rowId);
    addEditProductHistoryModal.openModal();
  }, [addEditProductHistoryModal]);

  const onRemoveClick = useCallback((id: string) => {
    removePriceHistory.mutate(id);
  }, [removePriceHistory]);

  const onAddNewPriceHistoryClick = useCallback(() => {
    addEditProductHistoryModal.setEditedRow('');
    addEditProductHistoryModal.openModal();
  }, [addEditProductHistoryModal]);

  const onAddNewPriceHistorySave = useCallback((postData: z.infer<typeof formSchema>) => {
    addPriceHistory.mutate({productId, postData});
    addEditProductHistoryModal.closeModal();
  }, [addPriceHistory, productId, addEditProductHistoryModal]);

  return (
    <>
      <div className="flex justify-end mb-4 w-full">
        <Button
          onClick={onAddNewPriceHistoryClick}
        >
          Add new price history
        </Button>
      </div>
      <CustomTable
        tableHead={tableHead}
        tableBody={tableBody}
        onEditClick={onEditClick}
        onRemoveClick={onRemoveClick}
      />
      {addEditProductHistoryModal.isOpen ? (
        <AddEditProductHistoryModal
          data={filteredData}
          onSave={onAddNewPriceHistorySave}
        />
      ) : null}
    </>
  )
}
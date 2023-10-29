import { create } from "zustand";
import axios from "axios";


interface ReceiptFromDateState {
  receipts: string[];
  updatedReceipts: (date: Date) => Promise<void>;
}

export const useGetReceiptFromDate = create<ReceiptFromDateState>((set) => ({
  receipts: [],
  updatedReceipts: async (date: Date) => {
    const receipts = await axios.get(`/api/admin/receipts/${date}`);

    set({ receipts: receipts.data.data });
  },
}));
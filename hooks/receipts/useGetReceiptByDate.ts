import { create } from "zustand";
import axios from "axios";


interface ReceiptFromDateState {
  receipts: string[];
  updateReceipts: (date: Date) => Promise<void>;
}

export const useGetReceiptFromDate = create<ReceiptFromDateState>((set) => ({
  receipts: [],
  updateReceipts: async (date: Date) => {
    const { data } = await axios.get(`/api/admin/receipts/${date}`);

    set({ receipts: data.data });
  },
}));
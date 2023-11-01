import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useRemovePriceHistory() {
  const queryClient = useQueryClient();

  const removePriceHistory = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/admin/products/${id}/price-history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  return removePriceHistory;
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";
import * as z from "zod";

import { formSchema } from "@/components/modals/AddEditProductHistoryModal/constants";

interface MutationFnProps {
  productId: string;
  priceHistoryId: string;
  postData: z.infer<typeof formSchema>;
}

export function useEditPriceHistory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const addPriceHistory = useMutation({
    mutationFn: async ({productId, priceHistoryId, postData} : MutationFnProps) => {
      const { data } = await axios.patch(`/api/admin/products/${productId}/price-history/${priceHistoryId}`, postData);

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try updating product price history later.",
        });
      } else {
        toast({
          variant: "success",
          title: "Price history updated!",
          description: "The price history for selected product has been updated.",
        });
      
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  return addPriceHistory;
}
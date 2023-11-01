import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";
import * as z from "zod";

import { formSchema } from "@/components/modals/AddEditProductHistoryModal/constants";

interface MutationFnProps {
  productId: string;
  postData: z.infer<typeof formSchema>;
}

export function useAddPriceHistory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const addPriceHistory = useMutation({
    mutationFn: async ({productId, postData} : MutationFnProps) => {
      const { data } = await axios.post(`/api/admin/products/${productId}/price-history`, postData);

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try adding product price history later.",
        });
      } else {
        toast({
          variant: "success",
          title: "Price history added!",
          description: "The price history for selected product has been added.",
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
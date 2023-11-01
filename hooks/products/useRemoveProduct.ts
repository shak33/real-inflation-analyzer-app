import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";

export function useRemoveProduct() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const removeProduct = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/products/${id}`);

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try removing product later.",
        });
      } else {
        toast({
          variant: "success",
          title: "Product removed!",
          description: "The product has been removed.",
        });
      }

      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return removeProduct;
}
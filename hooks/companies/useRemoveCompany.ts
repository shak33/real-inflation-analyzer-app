import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";

export function useRemoveCompany() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const removeCompany = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/companies/${id}`);

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try removing company later.",
        });
      } else {
        toast({
          variant: "success",
          title: "Company removed!",
          description: "The company has been removed.",
        });
      }

      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  return removeCompany;
}

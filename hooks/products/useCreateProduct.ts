import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/utils/useToast";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

import { formSchema } from "@/app/admin/products/_components/ProductForm/constants";

type FormData = z.infer<typeof formSchema>;

export function useCreateProduct(form: UseFormReturn<FormData>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (postData: z.infer<typeof formSchema>) => {
      const { data } = await axios.post("/api/admin/products", postData);

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try adding product later.",
        });
      } else {
        toast({
          variant: "success",
          title: "Product added!",
          description: "The product has been added.",
        });
      }

      return data.data;
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return createMutation;
}
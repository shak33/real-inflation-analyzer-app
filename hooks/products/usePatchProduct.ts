import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as z from "zod";
import { useToast } from "@/hooks/utils/useToast";

import { formSchema } from "@/app/admin/products/_components/EditProductForm/constants";

interface MutationFnProps {
  productId: string;
  postData: z.infer<typeof formSchema>;
}

export function usePatchProduct() {
  const { toast } = useToast();
  const patchProduct = useMutation({
    mutationFn: async ({productId, postData} : MutationFnProps) => {
      const { data } = await axios.patch(`/api/admin/products/${productId}`, postData);

      if (data.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Please try updating product later.',
        });
      } else {
        toast({
          variant: 'success',
          title: 'Product updated!',
          description: 'The product has been updated.',
        });
      }
    },
  });
  
  return patchProduct;
}
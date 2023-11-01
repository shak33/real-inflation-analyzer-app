import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";
import * as z from "zod";

import { formSchema } from "@/components/modals/RegisterModal/constants";

interface MutationFnProps {
  postData: z.infer<typeof formSchema>;
  toggleRegisterModal: () => void;
}

export function useRegisterUser() {
  const { toast } = useToast();
  const loginUser = useMutation({
    mutationFn: async ({ postData, toggleRegisterModal } : MutationFnProps) => {
      const { data } = await axios.post("/api/auth/register", postData);

      if (data.status === 200) {
        toast({
          variant: "success",
          title: "User created!",
          description: "The user has been created. You can now log in.",
        });

        toggleRegisterModal();
      } 

      return data.data;
    }
  });

  return loginUser;
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";

export function useGetUsers() {
  const { toast } = useToast();
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      
      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try fetching users later.",
        });
      }
      
      return data.data;
    },
  });

  return users;
}
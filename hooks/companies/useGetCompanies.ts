import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/utils/useToast";

export function useCompanies() {
  const { toast } = useToast();
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await axios.get("/api/companies");

      if (data.status !== 200) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try fetching companies later.",
        });
      }

      return data.data;
    },
  });

  return companies;
}

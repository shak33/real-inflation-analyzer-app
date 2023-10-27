import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCompanies() {
  const companies = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data } = await axios.get('/api/companies');
      return data.data;
    },
  });

  return companies;
}
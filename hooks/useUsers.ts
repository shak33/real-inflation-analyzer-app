import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUsers() {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data.data;
    },
  });

  return users;
}
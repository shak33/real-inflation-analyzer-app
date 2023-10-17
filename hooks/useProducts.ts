import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProducts() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/api/products');
      return data.data;
    },
  });

  return products;
};
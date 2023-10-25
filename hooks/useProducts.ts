import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseProductsProps {
  id?: string;
}

async function fetchProductById(id: string) {
  const { data } = await axios.get(`/api/products/${id}`);
  return data.data;
}

async function fetchAllProducts() {
  const { data } = await axios.get('/api/products');
  return data.data;
}

export function useProducts({
  id,
} : UseProductsProps) {
  const queryKey = id ? ['product', id] : ['products'];

  const data = useQuery({
    queryKey,
    queryFn: () => (id ? fetchProductById(id) : fetchAllProducts()),
    refetchOnWindowFocus: false,
  });

  return data;
}
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/utils/useToast';

interface UseProductsProps {
  id?: string;
  searchQuery?: string;
}

export async function fetchProductById(toast: any, id: string) {
  const { data } = await axios.get(`/api/products/${id}`);
  
  if (data.status !== 200) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'Please try fetching product later.',
    });
  }
  
  return data.data;
}

export async function fetchAllProducts(toast: any, searchQuery = "") {
  const { data } = await axios.get('/api/products?searchQuery=' + searchQuery);

  if (data.status !== 200) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'Please try fetching products later.',
    });
  }

  return data.data;
}

export function useGetProducts({
  id,
  searchQuery,
} : UseProductsProps) {
  const { toast } = useToast();
  const queryKey = id ? ['product', id] : ['products', { searchQuery }];

  const data = useQuery({
    queryKey,
    queryFn: () => (id ? fetchProductById(toast, id) : fetchAllProducts(toast, searchQuery)),
  });

  return data;
}
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/utils/useToast';

interface UseProductsProps {
  id?: string;
}

export async function fetchProductById(id: string, toast: any) {
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

export async function fetchAllProducts(toast: any) {
  const { data } = await axios.get('/api/products');

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
} : UseProductsProps) {
  const { toast } = useToast();
  const queryKey = id ? ['product', id] : ['products'];

  const data = useQuery({
    queryKey,
    queryFn: () => (id ? fetchProductById(id, toast) : fetchAllProducts(toast)),
  });

  return data;
}
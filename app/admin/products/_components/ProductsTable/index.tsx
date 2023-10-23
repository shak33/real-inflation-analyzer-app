"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { CustomTable } from "@/components/Table";

import { useProducts } from "@/hooks/useProducts";

import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";

export const ProductsTable = () => {
  const queryClient = useQueryClient();
  const products = useProducts({});
  const router = useRouter();

  const tableHead = [
    "Short name",
    "Name",
    "Company",
    "Barcode",
    "Price",
    "Price with discount",
  ];

  const tableBody = products?.data?.map(({id, shortName, name, company, barcode, date, priceHistory}: ProductsTableProduct) => ({
    id,
    shortName,
    name,
    company: company?.name,
    barcode,
    price: priceHistory.at(-1)?.price,
    priceWithDiscount: priceHistory.at(-1)?.priceWithDiscount ? 'Yes' : 'No',
  }));

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onEditClick = useCallback((id: string) => {
    router.push(`/admin/products/${id}`);
  }, [router]);

  const onRemoveClick = useCallback((id: string) => {
    removeMutation.mutate(id);
  }, [removeMutation]);
  
  if (products.isLoading) {
    return <div>Loading</div>
  }

  if (removeMutation.isLoading) {
    return <div>Removing product. Please wait...</div>;
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  )
} 
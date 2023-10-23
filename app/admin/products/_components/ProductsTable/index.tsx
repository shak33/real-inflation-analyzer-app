"use client";

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
    "Date",
    "Price",
    "Price with discount",
  ];

  const tableBody = products?.data?.map(({id, shortName, name, company, barcode, date, priceHistory, priceWithDiscount}: ProductsTableProduct) => [
    shortName,
    name,
    company?.name,
    barcode,
    date,
    priceHistory.at(-1)?.price,
    priceWithDiscount,
  ]);

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

  const onEditClick = (id: string) => {
    router.push(`/admin/products/${id}`);
  }

  const onRemoveClick = (id: string) => {
    removeMutation.mutate(id);
  };
  
  if (products.isLoading) {
    return <div>Loading</div>
  }

  if (removeMutation.isLoading) {
    return <div>Performing request. Please wait...</div>;
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
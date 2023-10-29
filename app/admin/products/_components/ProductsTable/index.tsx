"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { CustomTable } from "@/components/Table";

import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useRemoveProduct } from "@/hooks/products/useRemoveProduct";

import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";

export const ProductsTable = () => {
  const products = useGetProducts({});
  const removeProduct = useRemoveProduct();
  const router = useRouter();

  const tableHead = [
    "Short name",
    "Name",
    "Company",
    "Barcode",
    "Price",
    "Price with discount",
  ];

  const tableBody = useMemo(() => {
    return products?.data?.map(({
      id,
      shortName,
      name,
      company,
      barcode,
      date,
      priceHistory,
    } : ProductsTableProduct) => ({
      id,
      shortName,
      name,
      company: company?.name,
      barcode,
      price: priceHistory.at(-1)?.price,
      priceWithDiscount: priceHistory.at(-1)?.priceWithDiscount ? "Yes" : "No",
    })) || [];
  }, [products.data]);

  const onEditClick = useCallback((id: string) => {
    router.push(`/admin/products/${id}`);
  }, [router]);

  const onRemoveClick = useCallback((id: string) => {
    removeProduct.mutate(id);
  }, [removeProduct]);

  if (products.isLoading) {
    return <div>Loading products, please wait...</div>;
  }

  if (removeProduct.isLoading) {
    return <div>Removing product, please wait...</div>;
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
};

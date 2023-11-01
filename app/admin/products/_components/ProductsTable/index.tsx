"use client";

import { useState, ChangeEvent } from "react";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { CustomTable } from "@/components/Table";

import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useRemoveProduct } from "@/hooks/products/useRemoveProduct";
import { useDebounce } from "@/hooks/utils/useDebounce";

import { ProductsTableProduct } from "@/interfaces/ProductsTableProduct";

export const ProductsTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce({
    value: searchQuery,
    delay: 500,
  });
  const products = useGetProducts({
    searchQuery: debouncedSearchQuery,
  });
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

  const onSearchInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const onEditClick = useCallback((id: string) => {
    router.push(`/admin/products/${id}`);
  }, [router]);

  const onRemoveClick = useCallback((id: string) => {
    removeProduct.mutate(id);
  }, [removeProduct]);

  if (removeProduct.isLoading) {
    return <div>Removing product, please wait...</div>;
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
      searchQuery={searchQuery}
      onSearchInputChange={onSearchInputChange}
      isLoading={products.isLoading}
      loadingText="Loading products, please wait..."
    />
  );
};

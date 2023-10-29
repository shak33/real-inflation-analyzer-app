"use client";

import { useProducts } from "@/hooks/products/useGetProducts";

interface EditProductPageProps {
  productId: string;
}

import { EditProductForm } from "../_components/EditProductForm";
import { PriceHistoryTable } from "./_components/PriceHistoryTable";

export default function EditProductPage({
  params,
}: {
  params: EditProductPageProps;
}) {
  const product = useProducts({
    id: params.productId,
  });

  if (product.isLoading) {
    return <p>Loading products, please wait...</p>;
  }

  return (
    <>
      <h1 className="mb-8">Edit product</h1>
      <EditProductForm data={product} />
      <PriceHistoryTable data={product.data.priceHistory} />
    </>
  );
}

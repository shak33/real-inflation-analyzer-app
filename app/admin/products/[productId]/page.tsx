"use client";

import { useProducts } from "@/hooks/useProducts";

import { EditProductForm } from "../_components/EditProductForm";

interface EditProductPageProps {
  productId: string;
}

import { PriceHistoryTable } from "./_components/PriceHistoryTable";

export default function EditProductPage({ params } : { params: EditProductPageProps}) {
  const product = useProducts({
    id: params.productId,
  });

  if (product.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="mb-8">Edit product</h1>
      {product?.data ?
        <EditProductForm
          data={product}
        />
      : null}
      {product?.data?.priceHistory ?
        <PriceHistoryTable
          data={product.data.priceHistory}
        />
      : null}
    </>
  )
}
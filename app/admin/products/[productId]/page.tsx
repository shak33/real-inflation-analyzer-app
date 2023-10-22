"use client";

import { useProducts } from "@/hooks/useProducts";

import { EditProductForm } from "../_components/EditProductForm";

interface EditProductPageProps {
  productId: string;
}

export default function EditProductPage({ params } : { params: EditProductPageProps}) {
  const product = useProducts({
    id: params.productId,
  });

  return (
    <>
      <h1 className="mb-8">Edit product</h1>
      <EditProductForm
        data={product}
      />
    </>
  )
}
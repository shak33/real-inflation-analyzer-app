"use client";

import { CustomTable } from "@/components/Table";
import { TableCell } from "@/components/ui/table";

import { useProducts } from "@/hooks/useProducts";

import { EditProductForm } from "../_components/EditProductForm";
import { ProductPriceHistory } from "@prisma/client";

interface EditProductPageProps {
  productId: string;
}

export default function EditProductPage({ params } : { params: EditProductPageProps}) {
  const product = useProducts({
    id: params.productId,
  });

  const tableHead = ['Price', 'Price with discount', 'Date', 'Receipt'];

  const tableBody = product?.data?.priceHistory.map(({price, priceWithDiscount, date, receiptImage} : ProductPriceHistory) => {
    return [
      price,
      priceWithDiscount,
      date,
      receiptImage,
    ];
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
        <CustomTable
          tableHead={tableHead}
          tableBody={tableBody}
        />
      : null}
    </>
  )
}
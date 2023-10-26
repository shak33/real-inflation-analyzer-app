import { NextResponse } from "next/server";

import { deleteProduct } from "@/actions/products/deleteProduct";
import { patchProduct } from "@/actions/products/patchProduct";

interface DeleteParams {
  productId: string;
}

interface PatchParams {
  productId: string;
}

export async function DELETE(
  request: Request,
  { params } : { params: DeleteParams },
) {
  const { productId } = params;
  const {
    message,
    status,
  } = await deleteProduct({
    productId: productId,
  });

  return NextResponse.json({
    message,
    status,
  });
}

export async function PATCH(
  request: Request,
  { params } : { params : PatchParams},
) {
  const { productId } = params;
  const data = await request.json();

  const {
    message,
    status,
  } = await patchProduct({
    data: {
      ...data,
      productId,
    },
  });

  return NextResponse.json({
    message,
    status,
  });
}
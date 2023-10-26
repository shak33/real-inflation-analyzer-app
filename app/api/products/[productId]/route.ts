import { NextResponse } from "next/server";

import { getProducts } from "@/actions/products/getProducts";

export async function GET(
  request: Request,
  context: { params: { productId: string } },
) {
  const {
    data,
    message,
    status,
  } = await getProducts({
    id: context.params.productId,
  });

  return NextResponse.json({
    data,
    message,
    status,
  });
}

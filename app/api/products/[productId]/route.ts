import { NextResponse } from "next/server";

import { getProducts } from "@/actions/getProducts";

export async function GET(request: Request, context: { params: { productId: string; }; }) {
  const products = await getProducts({
    id: context.params.productId,
  });

  return NextResponse.json({
    status: 200,
    data: products,
  })
}

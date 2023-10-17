import { NextResponse } from "next/server";

import { getProducts } from "@/actions/getProducts";

export async function GET(request: Request, context: { params: { id: string; }; }) {
  const products = await getProducts({
    id: undefined,
  });

  return NextResponse.json({
    status: 200,
    data: products,
  })
}

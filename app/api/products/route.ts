import { NextResponse } from "next/server";

import { getProducts } from "@/actions/getProducts";

export async function GET() {
  const products = await getProducts({});

  return NextResponse.json({
    status: 200,
    data: products,
  })
}

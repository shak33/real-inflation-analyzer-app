import { NextResponse } from "next/server";

import { getProducts } from "@/actions/products/getProducts";

export async function GET() {
  const {
    data,
    message,
    status,
  } = await getProducts({});

  return NextResponse.json({
    data,
    message,
    status,
  });
}

import { NextResponse } from "next/server";

import { createProduct } from "@/actions/products/createProduct";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const {
    message,
    status,
  } = await createProduct(body);

  return NextResponse.json({
    message,
    status,
  });
}

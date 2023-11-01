import { NextResponse } from "next/server";

import { getProducts } from "@/actions/products/getProducts";

export async function GET(
  request: Request,
) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('searchQuery') || "";

  const {
    data,
    message,
    status,
  } = await getProducts({
    searchQuery,
  });

  return NextResponse.json({
    data,
    message,
    status,
  });
}

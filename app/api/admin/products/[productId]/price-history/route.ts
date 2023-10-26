import { NextResponse } from "next/server";

import { createPriceHistory } from "@/actions/products/priceHistory/createPriceHistory";

interface PostParams {
  productId: string;
}

export async function POST(
  request: Request,
  { params }: { params : PostParams },
) {
  const { productId } = params;
  const data = await request.json();
  const {
    message,
    status,
  } = await createPriceHistory({
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
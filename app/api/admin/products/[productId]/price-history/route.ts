import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface PostParams {
  productId: string;
}

export async function POST(
  request: Request,
  { params }: { params : PostParams },
) {
  try {
    const { productId } = params;
    const { price, priceWithDiscount, date, receiptImage } = await request.json();

    await prisma.productPriceHistory.create({
      data: {
        productId,
        price,
        priceWithDiscount,
        date,
        receiptImage,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
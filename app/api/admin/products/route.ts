import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { shortName, name, price, priceWithDiscount, barcode } = body;

  try {
    const product = await prisma.product.create({
      data: {
        shortName,
        name,
        barcode,
      },
    });

    await prisma.productPriceHistory.create({
      data: {
        productId: product.id,
        price,
        priceWithDiscount,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Product created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

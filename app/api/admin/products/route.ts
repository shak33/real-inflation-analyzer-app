import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      shortName, name, price, priceWithDiscount, barcode, companyId,
      receiptImage,
    } = body;

    const product = await prisma.product.create({
      data: {
        shortName,
        name,
        barcode,
        companyId,
      },
    });

    await prisma.productPriceHistory.create({
      data: {
        productId: product.id,
        price,
        priceWithDiscount,
        receiptImage,
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

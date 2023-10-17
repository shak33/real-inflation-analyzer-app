import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);

  const { shortName, name, price, priceWithDiscount, barcode } = body;

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
}

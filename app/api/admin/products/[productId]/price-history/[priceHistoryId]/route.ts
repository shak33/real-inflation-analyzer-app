import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface DeleteParams {
  priceHistoryId: string;
}

interface PatchParams {
  priceHistoryId: string;
}

export async function DELETE(
  request: Request,
  { params } : { params : DeleteParams },
) {
  try {
    const { priceHistoryId } = params;

    await prisma.productPriceHistory.delete({
      where: {
        id: priceHistoryId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Price history deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

export async function PATCH(
  request: Request,
  { params } : { params : PatchParams},
) {
  try {
    const { priceHistoryId } = params;
    const { price, priceWithDiscount, date, receiptImage } = await request.json();

    await prisma.productPriceHistory.update({
      where: {
        id: priceHistoryId,
      },
      data: {
        price,
        priceWithDiscount,
        date,
        receiptImage,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Price history updated successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
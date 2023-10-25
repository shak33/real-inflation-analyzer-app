import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface DeleteParams {
  priceHistoryId: string;
}

export async function DELETE(
  request: Request,
  { params } : { params : DeleteParams},
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
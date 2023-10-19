import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface DeleteParams {
  productId: string;
}

export async function DELETE(
  request: Request,
  { params } : { params: DeleteParams },
) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    await prisma.productPriceHistory.deleteMany({
      where: {
        productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Product ${product?.shortName} deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
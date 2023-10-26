import prisma from "@/libs/prismadb";

interface DeleteProductParams {
  productId: string;
}

export async function deleteProduct({
  productId,
} : DeleteProductParams) {
  try {
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

    return {
      message: `Product ${product?.shortName} deleted successfully`,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
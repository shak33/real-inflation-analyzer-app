import prisma from "@/libs/prismadb";

interface DeletePriceHistoryParams {
  priceHistoryId: string;
}

export async function deletePriceHistory({
  priceHistoryId,
} : DeletePriceHistoryParams) {
  try {
    await prisma.productPriceHistory.delete({
      where: {
        id: priceHistoryId,
      },
    });

    return {
      message: "Price history deleted successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
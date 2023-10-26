import prisma from "@/libs/prismadb";

interface PatchPriceHistoryParams {
  data: {
    priceHistoryId: string;
    price: number;
    priceWithDiscount: boolean;
    date: Date;
    receiptImage: string;
  }
}

export async function patchPriceHistory({
  data,
} : PatchPriceHistoryParams) {
  try {
    const {
      priceHistoryId,
      price,
      priceWithDiscount,
      date,
      receiptImage,
    } = data;

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

    return {
      status: 200,
      message: `Price history updated successfully`,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
}
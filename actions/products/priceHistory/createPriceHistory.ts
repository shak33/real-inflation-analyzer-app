import prisma from "@/libs/prismadb";

interface CreatePriceHistoryParams {
  data: {
    productId: string;
    price: number;
    priceWithDiscount: boolean;
    date: Date;
    receiptImage: string;
  }
}

export async function createPriceHistory({
  data,
} : CreatePriceHistoryParams) {
  try {
    const {
      productId,
      price,
      priceWithDiscount,
      date,
      receiptImage,
    } = data;

    await prisma.productPriceHistory.create({
      data: {
        productId,
        price,
        priceWithDiscount,
        date,
        receiptImage,
      },
    });

    return {
      message: "Price history created successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    }
  }
}
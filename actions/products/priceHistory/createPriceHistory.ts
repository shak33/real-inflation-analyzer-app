import prisma from "@/libs/prismadb";

import { parseEuropeanNumber } from "@/utils/parseEuropeanNumber";

import { getCurrentUser } from "@/actions/users/getCurrentUser";

interface CreatePriceHistoryParams {
  data: {
    productId: string;
    price: string;
    priceWithDiscount: boolean;
    date: Date;
    receiptImage: string;
  }
}

export async function createPriceHistory({
  data,
} : CreatePriceHistoryParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.data?.id) {
    return {
      message: "User not found",
      status: 404,
    }
  }

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
        price: parseEuropeanNumber(price),
        priceWithDiscount,
        date,
        receiptImage,
        createdById: currentUser?.data?.id,
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
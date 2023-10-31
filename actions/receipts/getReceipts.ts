import prisma from "@/libs/prismadb";

import { getCurrentUser } from "@/actions/users/getCurrentUser";

import { getDateRange } from "@/utils/getDateRange";

interface GetReceiptsParams {
  date?: Date;
}

export async function getReceipts({
  date,
} : GetReceiptsParams) {
  try {
    if (date) {
      const currentUser = await getCurrentUser();
      const { startDate, endDate } = getDateRange(date);

      if (!currentUser?.data?.id) {
        return {
          data: null,
          message: "User not found",
          status: 404,
        };
      }
      
      const products = await prisma.product.findMany({
        where: {
          priceHistory: {
            some: {
              createdById: currentUser?.data?.id,
              date: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
        include: {
          priceHistory: {
            where: {
              createdById: currentUser?.data?.id,
              date: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      });

      const receipts = [] as string[];

      products.forEach((product) => {
        product.priceHistory.forEach((priceHistory) => {
          if (priceHistory.receiptImage && !receipts.includes(priceHistory.receiptImage)) {
            receipts.push(priceHistory.receiptImage);
          }
        });
      });

      return {
        data: receipts,
        message: "",
        status: 200,
      }
    }

    if (!date) {
      return {
        data: null,
        message: "Date is required",
        status: 400,
      }
    }
  } catch (error: any) {
    return {
      data: null,
      message: error.message,
      status: 500,
    };
  }
}
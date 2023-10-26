import prisma from "@/libs/prismadb";

import { getDateRange } from "@/utils/getDateRange";

interface GetReceiptsParams {
  date?: Date;
}

export async function getReceipts({
  date,
} : GetReceiptsParams) {
  try {
    if (date) {
      const { startDate, endDate } = getDateRange(date);
      
      const receipts = await prisma.product.findMany({
        where: {
          priceHistory: {
            some: {
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
              date: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      });

      return {
        data: receipts.map((receipt) => {
          const actualReceipts = receipt.priceHistory.map((priceHistory) => priceHistory.receiptImage);
          return actualReceipts;
        }),
        message: "",
        status: 200,
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
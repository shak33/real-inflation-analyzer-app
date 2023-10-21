import prisma from "@/libs/prismadb";

import { getDateRange } from "@/utils/getDateRange";

export async function getReceipts({
  date,
} : {
  date: Date;
}) {
  try {
    const { startDate, endDate } = getDateRange(date);

    if (date) {
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

      return receipts.map((receipt) => {
        const actualReceipts = receipt.priceHistory.map((priceHistory) => priceHistory.receiptImage);
        return actualReceipts;
      });
    }
  } catch (error: any) {
    return [];
  }
}
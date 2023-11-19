import prisma from "@/libs/prismadb";

import { parseEuropeanNumber } from "@/utils/parseEuropeanNumber";

import { getCurrentUser } from "@/actions/users/getCurrentUser";

interface CreateProductParams {
  shortName: string;
  name: string;
  price: string;
  priceWithDiscount: boolean;
  barcode: string;
  companyId: string;
  receiptImage: string;
  date: Date;
};

export async function createProduct(data : CreateProductParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.data?.id) {
      return {
        message: "User not found",
        status: 404,
      };
    }

    const {
      shortName, name, price, priceWithDiscount, barcode, companyId,
      receiptImage, date,
    } = data;

    const product = await prisma.product.create({
      data: {
        shortName,
        name,
        barcode,
        companyId,
        createdById: currentUser?.data?.id,
      },
    });

    await prisma.productPriceHistory.create({
      data: {
        productId: product.id,
        price: parseEuropeanNumber(price),
        priceWithDiscount,
        receiptImage,
        date,
        createdById: currentUser?.data?.id,
      },
    });

    return {
      message: "Product created successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
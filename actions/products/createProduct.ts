import prisma from "@/libs/prismadb";
import { Product } from "@prisma/client";

interface CreateProductParams {
  data: {
    shortName: string;
    name: string;
    price: number;
    priceWithDiscount: boolean;
    barcode: string;
    companyId: string;
    receiptImage: string;
    date: Date;
  };
}

export async function createProduct({
  data,
} : CreateProductParams) {
  try {
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
      },
    });

    await prisma.productPriceHistory.create({
      data: {
        productId: product.id,
        price,
        priceWithDiscount,
        receiptImage,
        date,
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
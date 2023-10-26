import prisma from "@/libs/prismadb";

interface PatchProductParams {
  data: {
    productId: string;
    shortName: string;
    name: string;
    companyId: string;
    barcode: string;
  };
}

export async function patchProduct({
  data,
} : PatchProductParams) {
  try {
    const {
      productId,
      shortName,
      name,
      companyId,
      barcode,
    } = data;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        shortName,
        name,
        companyId,
        barcode,
      },
    });

    return {
      message: `Product ${name} updated successfully`,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
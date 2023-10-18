import prisma from '@/libs/prismadb';

export async function getProducts({
  id,
}: {
  id?: string;
}) {
  try {
    if (id) {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          priceHistory: true,
          company: true,
        }
      });

      return product;
    }

    const products = await prisma.product.findMany({
      include: {
        priceHistory: true,
        company: true,
      },
    });

    return products;
  } catch (error: any) {
    return [];
  }
}
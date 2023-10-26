import prisma from '@/libs/prismadb';

interface GetProductProps {
  id?: string;
}

export async function getProducts({
  id,
} : GetProductProps) {
  try {
    if (id) {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          priceHistory: {
            orderBy: {
              createdAt: 'desc',
            },
          },
          company: true,
        },
      });

      return {
        data: product,
        message: "",
        status: 200,
      };
    }

    const products = await prisma.product.findMany({
      include: {
        priceHistory: true,
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return {
      data: products,
      message: "",
      status: 200,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message,
      status: 500,
    };
  }
}
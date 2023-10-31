import prisma from '@/libs/prismadb';

interface GetProductProps {
  id?: string;
  searchQuery?: string;
}

export async function getProducts({
  id,
  searchQuery,
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
      where: {
        OR: [
          {
            shortName: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
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
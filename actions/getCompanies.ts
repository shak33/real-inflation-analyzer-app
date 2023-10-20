import prisma from '@/libs/prismadb';

export async function getCompanies({
  id,
}: {
  id?: string;
}) {
  try {
    if (id) {
      const company = await prisma.company.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        }
      });

      return company;
    }

    const companies = await prisma.company.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        products: true,
      }
    });

    const companiesWithProducts = companies.map((company) => ({
      ...company,
      products: company.products.length,
    }));

    return companiesWithProducts;
  } catch (error: any) {
    return [];
  }
}
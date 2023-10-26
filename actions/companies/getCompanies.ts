import prisma from '@/libs/prismadb';

interface GetCompaniesParams {
  id?: string;
}

export async function getCompanies({
  id,
} : GetCompaniesParams) {
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

      return {
        data: company,
        message: "",
        status: 200,
      };
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

    return {
      data: companiesWithProducts,
      message: "",
      status: 200,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message,
      status: 500,
    }
  }
}
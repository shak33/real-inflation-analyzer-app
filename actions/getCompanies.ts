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
      });

      return company;
    }

    const companies = await prisma.company.findMany();

    return companies;
  } catch (error: any) {
    return [];
  }
}
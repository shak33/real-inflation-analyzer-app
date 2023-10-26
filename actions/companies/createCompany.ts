import prisma from "@/libs/prismadb";

interface CreateCompanyParams {
  data: {
    name: string;
    logo: string;
  };
}

export async function createCompany({
  data,
} : CreateCompanyParams) {
  try {
    const {
      logo,
      name,
    } = data;

    if (!name) {
      return {
        message: "Company name is required",
        status: 403,
      };
    }

    await prisma.company.create({
      data: {
        logo,
        name,
      },
    });

    return {
      message: "Company created successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
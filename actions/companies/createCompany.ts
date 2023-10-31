import prisma from "@/libs/prismadb";

import { getCurrentUser } from "@/actions/users/getCurrentUser";

interface CreateCompanyParams {
  name: string;
  logo: string;
}

export async function createCompany(data : CreateCompanyParams) {
  try {
    const currentUser = await getCurrentUser();
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

    if (!currentUser?.data?.id) {
      return {
        message: "User not found",
        status: 404,
      };
    }

    await prisma.company.create({
      data: {
        logo,
        name,
        createdById: currentUser?.data?.id,
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
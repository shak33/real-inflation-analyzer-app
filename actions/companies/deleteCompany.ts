import prisma from "@/libs/prismadb";

interface DeleteCompanyParams {
  companyId: string;
}

export async function deleteCompany({
  companyId,
} : DeleteCompanyParams) {
  try {
    if (!companyId) {
      return {
        message: "Company id is required",
        status: 403,
      };
    }

    await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    return {
      message: `Company deleted successfully`,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
}
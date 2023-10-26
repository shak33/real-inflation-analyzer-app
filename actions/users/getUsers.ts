import prisma from "@/libs/prismadb";

interface GetUsersParams {
  id?: string;
}

export async function getUsers({
  id,
} : GetUsersParams) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      status: 200,
      data: users,
    }
  } catch (error: any) {
    return {
      status: 500,
      data: null,
      message: error.message,
    };
  }
}
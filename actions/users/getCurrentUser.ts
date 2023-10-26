import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return {
        data: null,
        message: "User not found",
        status: 404,
      };
    }

    return {
      data: user,
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
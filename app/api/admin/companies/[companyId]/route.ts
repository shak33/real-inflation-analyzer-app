import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface DeleteParams {
  companyId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: DeleteParams },
) {
  try {
    const { companyId } = params;

    await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Company deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
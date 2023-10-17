import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, logo } = body;

  try {
    await prisma.company.create({
      data: {
        name,
        logo,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Company created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
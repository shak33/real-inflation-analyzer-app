import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    if (!password || !email) {
      return NextResponse.json({
        message: "Missing fields",
        status: 400,
      });
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      data: user,
    })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
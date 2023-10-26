import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Role } from "@prisma/client";

import { getCurrentUserRole } from "@/actions/users/getCurrentUserRole";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/')) {
    const role = await getCurrentUserRole();

    if (role !== Role.ADMIN) {
      return NextResponse.json({
        status: 403,
        message: "You don't have access to this route",
      });
    }
  }

  return NextResponse.next();
}
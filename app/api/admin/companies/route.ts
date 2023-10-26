import { NextResponse } from "next/server";

import { getCurrentUserRole } from "@/actions/users/getCurrentUserRole";

import { createCompany } from "@/actions/companies/createCompany";

export async function POST(request: Request) {
  const role = await getCurrentUserRole();
  console.log(role);
  const body = await request.json();
  const {
    message,
    status,
  } = await createCompany(body)

  return NextResponse.json({
    message,
    status,
  });
}
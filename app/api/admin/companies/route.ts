import { NextResponse } from "next/server";

import { createCompany } from "@/actions/companies/createCompany";

export async function POST(request: Request) {
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
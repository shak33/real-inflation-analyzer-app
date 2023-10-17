import { NextResponse } from "next/server";

import { getCompanies } from "@/actions/getCompanies";

export async function GET(request: Request, context: { params: { id: string } }) {
  const companies = await getCompanies({
    id: undefined,
  });

  return NextResponse.json({
    status: 200,
    data: companies,
  });
}
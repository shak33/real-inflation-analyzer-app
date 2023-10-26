import { NextResponse } from "next/server";

import { getCompanies } from "@/actions/companies/getCompanies";

interface GetParams {
  id?: string;
}

export async function GET(
  request: Request,
  { params } : { params: GetParams },
 ) {
  const {
    data,
    message,
    status,
  } = await getCompanies({});

  return NextResponse.json({
    data,
    message,
    status,
  });
}
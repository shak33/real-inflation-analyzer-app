import { NextResponse } from "next/server";

import { deleteCompany } from "@/actions/companies/deleteCompany";

interface DeleteParams {
  companyId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: DeleteParams },
) {
  const { companyId } = params;
  const {
    message,
    status,
  } = await deleteCompany({
    companyId,
  });

  return NextResponse.json({
    message,
    status,
  });
}
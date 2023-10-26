import { NextResponse } from "next/server";

import { getUsers } from "@/actions/users/getUsers";

interface GetParams {
  id?: string;
}

export async function GET(
  request: Request,
  { params }: { params: GetParams },
) {
  const {
    data,
    message,
    status,
  } = await getUsers({});

  return NextResponse.json({
    status,
    data,
    message,
  })
}
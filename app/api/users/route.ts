import { NextResponse } from "next/server";

import { getUsers } from "@/actions/getUsers";

export async function GET(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  const users = await getUsers({
    id: undefined,
  });

  return NextResponse.json({
    status: 200,
    data: users,
  })
}
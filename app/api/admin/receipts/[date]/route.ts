import { NextResponse } from "next/server";

import { getReceipts } from "@/actions/receipts/getReceipts";

export async function GET(
  request: Request,
  context: { params : { date: Date } }
) {
  const {
    data,
    message,
    status,
  } = await getReceipts({
    date: context.params.date,
  });

  return NextResponse.json({
    data,
    message,
    status,
  });
}
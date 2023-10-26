import { NextResponse } from "next/server";

import { deletePriceHistory } from "@/actions/products/priceHistory/deletePriceHistory";
import { patchPriceHistory } from "@/actions/products/priceHistory/patchPriceHistory";

interface DeleteParams {
  priceHistoryId: string;
}

interface PatchParams {
  priceHistoryId: string;
}

export async function DELETE(
  { params } : { params : DeleteParams },
) {
  const { priceHistoryId } = params;
  const {
    message,
    status,
  } = await deletePriceHistory({
    priceHistoryId: priceHistoryId,
  });

  return NextResponse.json({
    message,
    status,
  });
}

export async function PATCH(
  request: Request,
  { params } : { params : PatchParams},
) {
  const { priceHistoryId } = params;
  const data = await request.json();
  const {
    message,
    status,
  } = await patchPriceHistory({
    data: {
      ...data,
      priceHistoryId,
    },
  });

  return NextResponse.json({
    message,
    status,
  });
}
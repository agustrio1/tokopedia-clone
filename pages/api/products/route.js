import { retriveData, retriveDataById } from "@/pages/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailProduct = await retriveDataByid("products", id);
    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailProduct,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "product not found",
      data: {},
    });
  }

  const data = await retriveData("products");

  return NextResponse.json({ status: 200, message: "ok", data });
}



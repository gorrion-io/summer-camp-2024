import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products";
import { productsPerPage } from "@/app/constants/main";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");

  const { products, totalNumberOfProducts } = await fetchProducts(
    page,
    productsPerPage
  );

  return NextResponse.json({ products, totalNumberOfProducts });
}

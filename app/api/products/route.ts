import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products";
import { productsPerPage } from "@/app/constants/main";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const searchQuery = String(searchParams.get("query") || "");

  const { products, totalNumberOfProducts } = await fetchProducts(
    page,
    productsPerPage,
    searchQuery
  );

  return NextResponse.json({ products, totalNumberOfProducts });
}

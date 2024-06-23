import { fetchProducts } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const productsResponse = fetchProducts(Number(page) - 1);

  if (!productsResponse.products.length || Number(page) < 0) {
    return new NextResponse("No products found!", { status: 404 });
  }

  return NextResponse.json(productsResponse);
}

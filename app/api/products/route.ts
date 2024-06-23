import { fetchProducts } from "@/lib/products";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const products = fetchProducts(Number(page) - 1);

  return Response.json(products);
}

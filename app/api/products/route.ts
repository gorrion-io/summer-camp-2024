import { fetchProducts } from "@/lib/products";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  return Response.json(fetchProducts(Number(page)));
}

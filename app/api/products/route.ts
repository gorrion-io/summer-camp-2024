import { fetchProducts } from "@/lib/products";
import { ProductResponse } from "@/lib/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const productResponse: ProductResponse = fetchProducts(
    page ? parseInt(page) : 1
  );
  return Response.json(productResponse);
}

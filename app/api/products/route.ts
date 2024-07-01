import { fetchProducts } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  return NextResponse.json(fetchProducts(page));
}

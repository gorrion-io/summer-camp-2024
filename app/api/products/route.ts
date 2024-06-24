/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

import { fetchProducts } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pageParam = req.nextUrl.searchParams.get("page");
    const pageNumber = pageParam ? parseInt(pageParam) : 0;
    const products = fetchProducts(pageNumber);
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

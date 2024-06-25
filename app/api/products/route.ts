/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */
import { NextRequest, NextResponse } from "next/server";
import { Product, fetchProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page");
    const products: Product[] = fetchProducts(page ? parseInt(page) : 0);
    return NextResponse.json({products});
}
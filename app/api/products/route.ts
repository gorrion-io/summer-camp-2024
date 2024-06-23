import { fetchProducts } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";
import { PaginatedResponse } from "@/app/types/paginatedResponseType";

/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageNumber = parseInt(searchParams.get("page") as string);

  const { paginatedProductsList, totalNumberOfPages, allProductsCount } =
    await fetchProducts(pageNumber);

  const response: PaginatedResponse = {
    paginatedProductsList,
    totalNumberOfPages,
    allProductsCount,
  };

  return NextResponse.json(response, { status: 200 });
}

/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

import { fetchProducts } from "@/lib/products";
import { Product, PaginationData, ProductArrayWithTotal } from "@/lib/products";

const isAlcoholHidden = true;

export async function GET(request: Request) {
  const page = extractPageNumber(request);
  const products: ProductArrayWithTotal = await fetchSortedProducts(page);
  const paginationData: PaginationData = products.paginationData;
  return Response.json({ products, paginationData });
}

function extractPageNumber(request: Request): number {
  const url = new URL(request.url);
  const pageQueryParam = url.searchParams.get("page");
  const pageNumber = parseInt(pageQueryParam || "1", 10);
  return pageNumber;
}

async function fetchSortedProducts(page: number) {
  const products = fetchProducts(page);
  return products;
}

/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

import { fetchProducts } from "@/lib/products";

export async function GET() {
    return Response.json(fetchProducts(0));
}
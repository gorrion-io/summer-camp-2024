/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

import { fetchProducts } from "@/lib/products";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 0;
  return Response.json(fetchProducts(page));
}

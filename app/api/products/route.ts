import { fetchProducts, fetchProductsCount } from "@/lib/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "0", 10);

  try {
    const products = await fetchProducts(page);
    const totalProducts = await fetchProductsCount();
    return new Response(JSON.stringify({ products, totalProducts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

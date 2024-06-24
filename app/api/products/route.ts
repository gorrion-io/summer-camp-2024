import { fetchProducts } from "@/lib/products";

export async function GET() {
    return new Response(JSON.stringify(fetchProducts(1)));
}
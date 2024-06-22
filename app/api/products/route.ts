import { fetchProducts } from "@/lib/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "0";
  const data = await fetchProducts(parseInt(page));
  return Response.json(data);
}

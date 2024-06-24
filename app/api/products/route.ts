import { fetchProducts } from "@/lib/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page");

    if (!page) 
        return new Response(JSON.stringify(fetchProducts(0)));
    
    if (isNaN(parseInt(page))) 
        return new Response("Invalid page number.", { status: 400 });

    return new Response(JSON.stringify(fetchProducts(parseInt(page) - 1)));
}
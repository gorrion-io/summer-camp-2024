
import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts, getCountProducts } from '@/lib/products';
//endpoint returning products from concrete page and amount of all products using fetchproducts and getcountproducts functions from lib
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '0', 10);
    
    
    const products = await fetchProducts(page);
    const total = await getCountProducts();

    return NextResponse.json({ products, total });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

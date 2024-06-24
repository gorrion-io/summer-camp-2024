import { Product } from "@/lib/products";
import ProductList from "./pagelist";

async function getProducts(page: number): Promise<{ products: Product[], total: number }> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`);
  return res.json();
}

export default async function Page() {
  const initialPage = 0;
  const { products, total } = await getProducts(initialPage);
  const totalPages = Math.ceil(total / 10);
  
  
  return (
    <div className="mx-auto max-w-7xl">
      <ProductList initialProducts={products} total={total} initialPage={initialPage} totalPages={totalPages} />
    </div>
  );
}

import NavigationMenu from "@/components/NavigationMenu";
import ProductsTable from "@/components/ProductsTable";
import { Product } from "@/schemas/productSchema";

async function getProducts(
  page: number = 0
): Promise<{ products: Product[]; totalProducts: number }> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data;
}

export default async function Products({
  searchParams,
}: {
  readonly searchParams: {
    page?: string;
  };
}) {
  let page = 0;
  if (searchParams.page) page = parseInt(searchParams.page);
  if (isNaN(page) || page < 0) page = 0;

  const { products, totalProducts } = await getProducts(page);
  const productsCount = products.length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <ProductsTable products={products} />
            <NavigationMenu
              page={page}
              totalProducts={totalProducts}
              productsCount={productsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

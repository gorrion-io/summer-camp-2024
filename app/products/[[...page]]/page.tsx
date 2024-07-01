import { Product, createMergedDb } from "@/lib/products";
import fs from "fs";
import NextPrevPage from "@/components/NextPrevPage";
import Table from "@/components/Table";
import Showing from "@/components/Showing";

export async function getProducts(page = 0): Promise<Product[]> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Products() {
  const result = fs.readFileSync("db.json", { encoding: "utf8" });
  const allProducts: Product[] = result ? JSON.parse(result) : [];

  createMergedDb();

  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-clip sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table products={products} />
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <Showing prodLength={allProducts.length} />
              <NextPrevPage prodLength={allProducts.length} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

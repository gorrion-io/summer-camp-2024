import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import { Product } from "@/lib/fileRead";
import { notFound } from "next/navigation";

async function getProducts(page: number): Promise<Product[]> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getProductsAmount(): Promise<number> {
  const res = await fetch(`http://localhost:3000/api/products/amount`);
  return res.json();
}

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const amount = await getProductsAmount();
  const pageString = searchParams["page"] ?? "0";
  const page: number = parseInt(pageString);
  if (page < 0 || page > Math.floor(amount / 10)) {
    notFound();
  }
  const products = await getProducts(page);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table products={products} />
            <Pagination
              hasNextPage={products.length < 10}
              hasPrevPage={page <= 0}
              amountOfProducts={amount}
              firstProduct={page * 10}
              lastProduct={page * 10 + 10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import ProductsPagination from "@/components/ProductsPagination";
import ProductsTable from "@/components/ProductsTable";
import { getProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const {
    paginatedProducts,
    startIndex,
    endIndex,
    pageCount,
    totalProductsAmount,
  } = await getProducts(currentPage);

  // handling invalid page parameters (non-numeric or out of range)
  if (isNaN(currentPage) || currentPage < 1 || currentPage > pageCount) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 mx-4 lg:mx-0 flow-root">
        <div className="-my-2 lg:-mx-8">
          <div>
            <ProductsTable paginatedProducts={paginatedProducts} />
            <ProductsPagination
              currentPage={currentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              pageCount={pageCount}
              totalProductsAmount={totalProductsAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

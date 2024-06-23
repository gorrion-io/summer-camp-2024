import { PAGE_SIZE } from "@/lib/consts";
import { ProductsResponse } from "@/lib/products";
import Link from "next/link";

async function getProducts(page: number): Promise<ProductsResponse> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`);

  if (!res.ok) {
    const errorMess = await res.text();
    throw new Error(errorMess || "Failed to fetch products!");
  }

  return res.json();
}

export default async function Page({ params }: { params: { page: string } }) {
  const currentPage = Number(params.page);
  const { products, paginationMetaData } = await getProducts(currentPage);

  const firstProductIndex =
    (paginationMetaData.currentPage - 1) * PAGE_SIZE + 1;
  const lastProductIndex = paginationMetaData.nextPage
    ? firstProductIndex + PAGE_SIZE - 1
    : paginationMetaData.totalRecords;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Contains alcohol
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {products.map((product: any) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                      {product.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {product.price} {product.currency}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {product.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {product.isAlcohol ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing{" "}
                  <span className="font-medium">{firstProductIndex}</span> to{" "}
                  <span className="font-medium">{lastProductIndex}</span> of{" "}
                  <span className="font-medium">
                    {paginationMetaData.totalRecords}
                  </span>{" "}
                  results
                </p>
              </div>

              <div className="flex flex-1 justify-between sm:justify-end">
                <Link
                  href={`${currentPage - 1}`}
                  className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                    paginationMetaData.prevPage ??
                    "pointer-events-none ring-gray-600 text-gray-600"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={`${currentPage + 1}`}
                  className={`relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                    paginationMetaData.nextPage ??
                    "pointer-events-none ring-gray-600 text-gray-600"
                  }`}
                >
                  Next
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

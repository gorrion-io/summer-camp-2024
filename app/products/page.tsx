import { getProducts } from "@/lib/products";
import Link from "next/link";
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
          <div className="">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-400 sm:pl-0"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-red-400"
                    >
                      Contains alcohol
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {paginatedProducts?.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-0">
                        {product.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {product.price} {product.currency}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {product.isAlcohol ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{totalProductsAmount}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end ">
                <Link
                  href={`/products?page=${currentPage - 1}`}
                  aria-disabled={currentPage <= 1}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                    currentPage <= 1 && "pointer-events-none opacity-50"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={`/products?page=${currentPage + 1}`}
                  aria-disabled={currentPage >= pageCount}
                  tabIndex={currentPage >= pageCount ? -1 : undefined}
                  className={`relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                    currentPage >= pageCount && "pointer-events-none opacity-50"
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

import { Product } from "@/schemas/productSchema";
import Link from "next/link";

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

  let products: Product[] = [];
  let totalProducts = 0;
  let errorMessage = "";

  try {
    const result = await getProducts(page);
    products = result.products;
    totalProducts = result.totalProducts;
  } catch (error) {
    errorMessage = (error as Error).message;
  }

  if (errorMessage) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold mb-4">
            Couldn&apos;t fetch products
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Go back to the homepage
          </Link>
        </div>
      </div>
    );
  }

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
                {products.map((product) => (
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
                {products.length < 10
                  ? // render empty rows to keep the layout consistent
                    Array.from({ length: 10 - products.length }).map(
                      (_, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            &nbsp;
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            &nbsp;
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            &nbsp;
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            &nbsp;
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            &nbsp;
                          </td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing <span className="font-medium">{page * 10 + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {totalProducts < (page + 1) * 10
                      ? totalProducts
                      : (page + 1) * 10}
                  </span>{" "}
                  of <span className="font-medium">{totalProducts}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {page > 0 && (
                  <Link
                    href={`?page=${page - 1}`}
                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </Link>
                )}
                {products.length === 10 && (
                  <Link
                    href={`?page=${page + 1}`}
                    className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

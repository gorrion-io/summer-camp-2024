//temp
export const fetchCache = "force-no-store";

import { notFound } from "next/navigation";
import ChangePageButton from "../components/page-change-handler";
import { productsPerPage } from "../constants/main";
import { Product } from "../types/Product";
import SearchBar from "../components/search-bar";

interface ProductsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

async function getProducts(
  page: number,
  searchQuery?: string
): Promise<{ products: Product[]; totalNumberOfProducts: number }> {
  let res = await fetch(`http://localhost:3000/api/products?page=${page}`);

  if (searchQuery !== "") {
    res = await fetch(
      `http://localhost:3000/api/products?page=${page}&query=${searchQuery}`
    );
  }

  if (!res.ok) {
    throw new Error(
      "Error occurred while connecting to database, please try again later"
    );
  }
  const products = await res.json();
  return products;
}

export default async function Products({ searchParams }: ProductsProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || "";
  const { products, totalNumberOfProducts } = await getProducts(
    currentPage,
    searchQuery
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <SearchBar />
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
                {products[0]?.id ? (
                  products.map((product) => (
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
                  ))
                ) : (
                  <p>{`there's nothing we can do`}</p>
                )}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing{" "}
                  <span className="font-medium">
                    {currentPage * productsPerPage - productsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {currentPage * productsPerPage < totalNumberOfProducts
                      ? currentPage * productsPerPage
                      : totalNumberOfProducts}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{totalNumberOfProducts}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <ChangePageButton
                  buttonText="Previous"
                  buttonAction="prev"
                  totalNumberOfProducts={totalNumberOfProducts}
                />
                <ChangePageButton
                  buttonText="Next"
                  buttonAction="next"
                  totalNumberOfProducts={totalNumberOfProducts}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

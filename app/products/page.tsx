"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchedProducts } from "../constants/types";

const INITIAL_EMPTY_DATA: FetchedProducts = {
  products: [],
  productsQuantity: 0,
  page: 0,
  productsQuantityFrom: 0,
  productsQuantityTo: 0,
};

export default function Products() {
  const [fetchedProducts, setFetchedProducts] =
    useState<FetchedProducts>(INITIAL_EMPTY_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products?page=${page}`
        );
        const data = await res.json();
        setFetchedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-8 text-center text-xl font-bold">
        Loading...
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
                {fetchedProducts.products.map((product) => (
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
                  <span className="font-medium">
                    {fetchedProducts.productsQuantityFrom}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {fetchedProducts.productsQuantityTo}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {fetchedProducts.productsQuantity}
                  </span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {parseInt(page) > 1 && (
                  <a
                    href={
                      parseInt(page) > 1
                        ? `http://localhost:3000/products?page=${
                            parseInt(page) - 1
                          }`
                        : ""
                    }
                    className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </a>
                )}
                {fetchedProducts.productsQuantityTo <
                  fetchedProducts.productsQuantity && (
                  <a
                    href={
                      fetchedProducts.productsQuantityTo <
                      fetchedProducts.productsQuantity
                        ? `http://localhost:3000/products?page=${
                            parseInt(page) + 1
                          }`
                        : ""
                    }
                    className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </a>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

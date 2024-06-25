"use client";
import { Product } from "@/lib/products";
import { useState, useEffect } from "react";

async function getProducts(): Promise<Product[]> {
  const params = window.location.search;
  const res = await fetch("http://localhost:3000/api/products" + params);
  return res.json();
}

async function getTotalProducts(): Promise<number> {
  const res = await fetch("http://localhost:3000/api/products?count=true");
  return res.json();
}

export default function Products() {
  /* TODO: Create an endpoint that returns a list of products, and use that here.
   */

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProduts, setTotalProducts] = useState(0);
  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      if (fetchedProducts.length === 0) {
        setCurrentPage(0);
        history.replaceState({}, "", "http://localhost:3000/products");
      }
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    async function fetchTotalProducts() {
      const fetchedTotalProducts = await getTotalProducts();
      setTotalProducts(fetchedTotalProducts);
    }

    fetchTotalProducts();
  }, []);

  const prevPageClasses = `relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset duration-300 focus-visible:outline-offset-0 ${
    currentPage === 0
      ? "cursor-not-allowed opacity-50"
      : "hover:bg-gray-200 hover:scale-110 ring-gray-300"
  }`;

  const nextPageClasses = `relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset duration-300 focus-visible:outline-offset-0 ${
    currentPage * 10 + products.length == totalProduts
      ? "cursor-not-allowed opacity-50"
      : "hover:bg-gray-200 hover:scale-110 ring-gray-300"
  }`;

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
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {product.price} {product.currency}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {product.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {product.isAlcohol ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* TODO: Pagination */}
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing{" "}
                  <span className="font-medium">{currentPage * 10 + 1}</span> to{" "}
                  <span className="font-medium">
                    {currentPage * 10 + products.length}
                  </span>{" "}
                  of <span className="font-medium">{totalProduts}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a
                  href="#"
                  className={prevPageClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    let URL = "http://localhost:3000/products";
                    if (currentPage - 1 >= 0) {
                      setCurrentPage((prevPage) => prevPage - 1);
                    } else {
                      return;
                    }
                    if (currentPage - 1 != 0) {
                      URL += `?page=${currentPage - 1}`;
                    }
                    history.replaceState({}, "", URL);
                  }}
                >
                  Previous
                </a>
                <a
                  href="#"
                  className={nextPageClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage * 10 + products.length == totalProduts) {
                      return;
                    }
                    setCurrentPage((prevPage) => prevPage + 1);
                    history.replaceState(
                      {},
                      "",
                      "http://localhost:3000/products" +
                        `?page=${currentPage + 1}`
                    );
                  }}
                >
                  Next
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

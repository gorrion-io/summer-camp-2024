"use client";

import { Product } from "@/lib/products";
import { useState, useEffect } from "react";

async function getProducts(page: number): Promise<Product[]> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`);
  console.log("Current Page:", page);
  return res.json();
}

export default function Products() {
  const [page, setPage] = useState(0);
  const [productsPages, setAllProducts] = useState<[Product[]]>([[]]);
  const [productsCount, setProductsCount] = useState(0);

  const updatePage = (newPage: number) => {
    if (newPage < 0 || newPage >= productsPages.length - 1) return;
    setPage(newPage);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let page = 0;
      let fetchedProducts: Product[] = await getProducts(page++);
      let products: [Product[]] = [fetchedProducts];

      while (fetchedProducts.length > 0) {
        fetchedProducts = await getProducts(page++);
        products.push(fetchedProducts);
      }
      setProductsCount(products.reduce((a, b) => a + b.length, 0));
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

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
                {productsPages[page].map((product) => (
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
                  Showing <span className="font-medium">{page * 10}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(page * 10 + 10, productsCount)}
                  </span>{" "}
                  of <span className="font-medium">{productsCount}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <a
                  href="#"
                  onClick={() => updatePage(page - 1)}
                  className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                  Previous
                </a>
                <a
                  href="#"
                  onClick={() => updatePage(page + 1)}
                  className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
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

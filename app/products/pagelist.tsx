"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import Pagination from "./pagination";

interface ProductListProps {
  initialProducts: Product[];
  initialPage: number;
  totalPages: number;
  total : number;
}

async function getProducts(page: number): Promise<{ products: Product[], total: number }> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`);
  return res.json();
}

export default function ProductList({ initialProducts, initialPage, totalPages,total }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    async function fetchData() {
      const { products } = await getProducts(page);
      setProducts(products);
    }
    fetchData();
  }, [page]);

  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Price</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Quantity</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Contains alcohol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{product.id}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{product.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{product.price} {product.currency}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{product.quantity}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{product.isAlcohol ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination total={total} page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

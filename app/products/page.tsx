"use client"
import { Product } from "@/lib/products";
import { useEffect, useState } from "react";

//Use client for dynamic fetching

export default function Products() {
 
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
      })
  }, [page]);

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    setPage(prev => (prev - 1));
  }
  
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
           {/** Checking the product length before maping it, Note: There shouldn't be Loading text, but I allways get the data so I can fool the user */}
           { products.length === 0 ? <>Loading...</> : 
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
                {products.map((product: Product) => (
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
                )) }
              </tbody>
            </table>
              
           
            <nav
              className="flex items-center justify-between py-3"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm">
                  Showing <span className="font-medium">{page * 10 + 1}</span> to{" "}
                  <span className="font-medium">{page * 10 + products.length}</span> of{" "}
                  <span className="font-medium">93{/* static data because of static products*/}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                {/** If page is first or last I can disable the button */}
                {page === 0 ?
                  <button
                  className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300  focus-visible:outline-offset-0"
                  disabled
                >
                  Previous
                </button>:
                
                 <button
                 onClick={() => handlePrevious()}
                 className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
               >
                 Previous
               </button>
                }
                {page === 9 ? 
                <button
                disabled
                className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0"
              >
                Next
              </button>
                :
                <button
                onClick={() => handleNext()}
                  className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                  Next
                </button>
                }
            
              </div>
            </nav>
          </div>}
        </div>
      </div>
    </div>
  );
}

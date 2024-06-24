"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { productsPerPageRevalidate } from "./products-revalidate";

const NOProductsSelect = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  function handleSelect(e: string) {
    params.set("perPage", e);
    params.set("page", "1");
    productsPerPageRevalidate();
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex max-w-sm mx-auto">
      <select
        name="productsNumber"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={params.get("perPage") || 10}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default NOProductsSelect;

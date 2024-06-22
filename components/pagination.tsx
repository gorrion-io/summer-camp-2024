"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  amountOfProducts: number;
  firstProduct: number;
  lastProduct: number;
}

export function Pagination({
  hasPrevPage,
  hasNextPage,
  amountOfProducts,
  firstProduct,
  lastProduct,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "0";

  return (
    <nav
      className="flex items-center justify-between py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{firstProduct}</span> to{" "}
          <span className="font-medium">
            {lastProduct > amountOfProducts ? amountOfProducts : lastProduct}
          </span>{" "}
          of <span className="font-medium">{amountOfProducts}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {/* <a> changed to <button> due to accessibility */}
        <button
          onClick={() => {
            router.push(`?page=${Number(page) - 1}`);
          }}
          disabled={hasPrevPage}
          className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-800 dark:ring-gray-300 dark:enabled:hover:bg-gray-800 enabled:hover:bg-gray-200 focus-visible:outline-offset-0"
        >
          Previous
        </button>
        {/* <a> changed to <button> due to accessibility */}
        <button
          onClick={() => {
            router.push(`?page=${Number(page) + 1}`);
          }}
          disabled={hasNextPage}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-800 dark:ring-gray-300 dark:enabled:hover:bg-gray-800 enabled:hover:bg-gray-200 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

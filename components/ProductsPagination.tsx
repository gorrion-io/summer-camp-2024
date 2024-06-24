import Link from "next/link";

interface ProductsPaginationProps {
  currentPage: number;
  startIndex: number;
  endIndex: number;
  pageCount: number;
  totalProductsAmount: number;
}

const ProductsPagination = ({
  currentPage,
  startIndex,
  endIndex,
  pageCount,
  totalProductsAmount,
}: ProductsPaginationProps) => {
  return (
    <nav
      className="flex items-center justify-between py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalProductsAmount}</span> results
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
  );
};

export default ProductsPagination;

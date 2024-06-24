import Link from "next/link";

const NavigationMenu = ({
  page,
  totalProducts,
  productsCount,
}: {
  page: number;
  totalProducts: number;
  productsCount: number;
}) => {
  return (
    <nav
      className="flex items-center justify-between py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{page * 10 + 1}</span> to{" "}
          <span className="font-medium">
            {totalProducts < (page + 1) * 10 ? totalProducts : (page + 1) * 10}
          </span>{" "}
          of <span className="font-medium">{totalProducts}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {page > 0 && (
          <Link
            href={`?page=${page - 1}`}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 hover:text-black"
          >
            Previous
          </Link>
        )}
        {productsCount === 10 && (
          <Link
            href={`?page=${page + 1}`}
            className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 hover:text-black"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};
export default NavigationMenu;

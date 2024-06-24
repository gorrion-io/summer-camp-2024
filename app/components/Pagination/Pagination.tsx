import PaginationNavigation from "./PaginationNavigation";
import PaginationItemsRange from "./PaginationItemsRange";

type PaginationProps = {
  currentPage: number;
  allProductsCount: number;
  totalNumberOfPages: number;
};

const Pagination = ({
  currentPage,
  allProductsCount,
  totalNumberOfPages,
}: PaginationProps) => {
  return (
    <nav
      className="flex flex-col-reverse sm:flex-col gap-0 sm:gap-3 justify-center items-center py-3 mt-3"
      aria-label="Pagination"
    >
      <PaginationItemsRange
        currentPage={currentPage}
        allProductsCount={allProductsCount}
      />
      <PaginationNavigation
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
      />
    </nav>
  );
};

export default Pagination;

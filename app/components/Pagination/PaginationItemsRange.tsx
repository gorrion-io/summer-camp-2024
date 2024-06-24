import getItemsRange from "@/lib/getItemsRange";

type PaginationItemsRangeProps = {
  currentPage: number;
  allProductsCount: number;
};

const PaginationItemsRange = ({
  currentPage,
  allProductsCount,
}: PaginationItemsRangeProps) => {
  const {
    firstPaginatedListElementIndex,
    lastPaginatedListElementIndex,
    lastListElementIndex,
  } = getItemsRange(currentPage, allProductsCount);

  return (
    <p className="pt-3 sm:pt-0 text-sm sm:mr-auto">
      Showing{" "}
      <span className="font-medium" data-testid="first-index">
        {firstPaginatedListElementIndex}
      </span>{" "}
      to{" "}
      <span className="font-medium" data-testid="last-index">
        {lastPaginatedListElementIndex}
      </span>{" "}
      of{" "}
      <span className="font-medium" data-testid="total-count">
        {lastListElementIndex}
      </span>{" "}
      results
    </p>
  );
};

export default PaginationItemsRange;

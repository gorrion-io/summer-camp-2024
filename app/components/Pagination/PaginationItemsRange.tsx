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
      <span className="font-medium">{firstPaginatedListElementIndex}</span> to{" "}
      <span className="font-medium">{lastPaginatedListElementIndex}</span> of{" "}
      <span className="font-medium">{lastListElementIndex}</span> results
    </p>
  );
};

export default PaginationItemsRange;

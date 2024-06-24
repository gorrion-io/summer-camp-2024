import { PAGE_SIZE } from "@/app/shared/consts";

export default function getItemsRange(pageNumber: number, listCount: number) {
  const firstPaginatedListElementIndex = (pageNumber - 1) * PAGE_SIZE + 1;
  const lastPaginatedListElementIndex = Math.min(
    pageNumber * PAGE_SIZE,
    listCount
  );

  return {
    firstPaginatedListElementIndex,
    lastPaginatedListElementIndex,
    lastListElementIndex: listCount,
  };
}

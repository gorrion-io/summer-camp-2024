import { expect, test } from "vitest";
import getItemsRange from "./getItemsRange";

test("correctly calculates the item range, for first page", () => {
  const {
    firstPaginatedListElementIndex,
    lastPaginatedListElementIndex,
    lastListElementIndex,
  } = getItemsRange(1, 100);

  expect(firstPaginatedListElementIndex).toBe(1);
  expect(lastPaginatedListElementIndex).toBe(10);
  expect(lastListElementIndex).toBe(100);
});

test("correctly calculates the item range, for last page", () => {
  const {
    firstPaginatedListElementIndex,
    lastPaginatedListElementIndex,
    lastListElementIndex,
  } = getItemsRange(10, 93);

  expect(firstPaginatedListElementIndex).toBe(91);
  expect(lastPaginatedListElementIndex).toBe(93);
  expect(lastListElementIndex).toBe(93);
});

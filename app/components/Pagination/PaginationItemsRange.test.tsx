import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import PaginationItemsRange from "./PaginationItemsRange";

test("renders pagination items range correctly when page number is 10", () => {
  render(<PaginationItemsRange currentPage={1} allProductsCount={100} />);

  expect(screen.getByTestId("first-index")).toHaveTextContent("1");
  expect(screen.getByTestId("last-index")).toHaveTextContent("10");
  expect(screen.getByTestId("total-count")).toHaveTextContent("100");
});

test("renders pagination items range correctly when page number is 10", () => {
  render(<PaginationItemsRange currentPage={10} allProductsCount={93} />);

  expect(screen.getByTestId("first-index")).toHaveTextContent("91");
  expect(screen.getByTestId("last-index")).toHaveTextContent("93");
  expect(screen.getByTestId("total-count")).toHaveTextContent("93");
});

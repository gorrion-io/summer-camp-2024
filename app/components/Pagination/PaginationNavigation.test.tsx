import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import PaginationNavigation from "./PaginationNavigation";

test("disables previous button on first page", () => {
  render(<PaginationNavigation currentPage={1} totalNumberOfPages={10} />);

  const previousButton = screen.getByText("<");
  expect(previousButton).toBeInTheDocument();
  expect(previousButton).toBeDisabled();
});

test("disables next button on last page", () => {
  render(<PaginationNavigation currentPage={10} totalNumberOfPages={10} />);

  const nextButton = screen.getByText(">");
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toBeDisabled();
});

test("renders pagination with correct buttons when currentPage is at the beginning", () => {
  render(<PaginationNavigation currentPage={1} totalNumberOfPages={10} />);

  expect(screen.getByText("<")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("...")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText(">")).toBeInTheDocument();
});

test("renders pagination with correct buttons when currentPage is in the middle", () => {
  render(<PaginationNavigation currentPage={4} totalNumberOfPages={10} />);

  expect(screen.getByText("<")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText(">")).toBeInTheDocument();

  const dots = screen.getAllByText("...");
  expect(dots.length).toBe(2);
});

test("renders pagination with correct buttons when currentPage is at the end", () => {
  render(<PaginationNavigation currentPage={10} totalNumberOfPages={10} />);

  expect(screen.getByText("<")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("...")).toBeInTheDocument();
  expect(screen.getByText("6")).toBeInTheDocument();
  expect(screen.getByText("7")).toBeInTheDocument();
  expect(screen.getByText("8")).toBeInTheDocument();
  expect(screen.getByText("9")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText(">")).toBeInTheDocument();
});

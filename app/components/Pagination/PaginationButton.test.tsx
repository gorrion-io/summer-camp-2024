import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import PaginationButton from "./PaginationButton";

test("renders children correctly", () => {
  render(<PaginationButton>1</PaginationButton>);
  expect(screen.getByText("1")).toBeInTheDocument();
});

test('renders as a div when children is "..."', () => {
  render(<PaginationButton>...</PaginationButton>);
  const element = screen.getByText("...");
  expect(element.tagName).toBe("DIV");
  expect(element).toHaveClass("pointer-events-none");
});

test('renders as a button when children is not "..."', () => {
  render(<PaginationButton>1</PaginationButton>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cursor-pointer");
});

test("applies the active styles when active is true", () => {
  render(<PaginationButton active>1</PaginationButton>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-white");
  expect(button).toHaveClass("!text-black");
});

test("applies the disabled styles when disabled is true", () => {
  render(<PaginationButton disabled>1</PaginationButton>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("disabled:pointer-events-none");
  expect(button).toHaveClass("disabled:opacity-50");
  expect(button).toBeDisabled();
});

test("applies the hover styles when hovered", () => {
  render(<PaginationButton>1</PaginationButton>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("hover:bg-white");
  expect(button).toHaveClass("hover:text-black");
});

import { test, expect, vi } from "vitest";
import getProducts from "./getProducts";
import { PaginatedResponse } from "@/app/types/paginatedResponseType";
import { BASE_URL } from "@/app/shared/consts";

const getProductsMockData = {
  paginatedProductsList: [
    {
      id: "0001",
      name: "Product 1",
      price: 10,
      currency: "GBP",
      quantity: 100,
      isAlcohol: false,
    },
    {
      id: "0002",
      name: "Product 2",
      price: 15,
      currency: "GBP",
      quantity: 200,
      isAlcohol: true,
    },
  ],
  totalNumberOfPages: 1,
  allProductsCount: 2,
};

test("returns data when fetch is successful", async () => {
  const pageNumber = 1;
  const mockResponse: PaginatedResponse = getProductsMockData;

  const mockFetchResponse = {
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => mockResponse,
    headers: new Headers(),
    redirected: false,
    type: "default",
    url: "",
  } as Response;

  global.fetch = vi.fn(() => Promise.resolve(mockFetchResponse));

  const response = await getProducts(pageNumber);
  expect(response).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/products?page=${pageNumber}`);
});

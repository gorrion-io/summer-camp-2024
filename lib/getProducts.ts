import { PaginatedResponse } from "@/app/types/paginatedResponseType";
import { BASE_URL } from "@/app/shared/consts";

export default async function getProducts(
  page: number
): Promise<PaginatedResponse> {
  const res = await fetch(`${BASE_URL}/products?page=${page}`);
  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      body?.message || `Failed to fetch data. Status code: ${res.status}`
    );
  }

  return body;
}

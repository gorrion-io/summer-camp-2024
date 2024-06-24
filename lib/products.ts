import mergeCsvAndJsonProducts from "./utils/mergeCsvAndJsonFiles";
import { PaginatedResponse } from "@/app/types/paginatedResponseType";
import { PAGE_SIZE } from "@/app/shared/consts";

export async function fetchProducts(page: number): Promise<PaginatedResponse> {
  const productsList = await mergeCsvAndJsonProducts();

  const filteredProducts = productsList.filter((product) => !product.isAlcohol);
  const sortedFilteredProducts = filteredProducts.sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedProductsList = sortedFilteredProducts.slice(
    startIndex,
    endIndex
  );
  const totalNumberOfPages = Math.ceil(
    sortedFilteredProducts.length / PAGE_SIZE
  );

  return {
    paginatedProductsList,
    totalNumberOfPages,
    allProductsCount: sortedFilteredProducts.length,
  };
}

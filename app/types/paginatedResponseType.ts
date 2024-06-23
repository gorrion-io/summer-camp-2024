import { Product } from "./productTypes";

export type PaginatedResponse = {
  paginatedProductsList: Product[];
  totalNumberOfPages: number;
  allProductsCount: number;
};

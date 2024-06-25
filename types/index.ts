export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export type CsvProduct = {
  Id: string;
  Name: string;
  Price: string;
  Currency: string;
  Quantity: string;
  IsAlcohol: string;
};

export type ApiResponse = {
  paginatedProducts: Product[];
  startIndex: number;
  endIndex: number;
  pageCount: number;
  totalProductsAmount: number;
};

export type ApiError = {
  message: string;
};

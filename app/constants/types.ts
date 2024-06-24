export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export interface FetchedProducts {
  products: Product[];
  page: number;
  productsQuantityFrom: number;
  productsQuantityTo: number;
  productsQuantity: number;
}

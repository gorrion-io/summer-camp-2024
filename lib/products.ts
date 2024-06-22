export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};

export function fetchProducts(page: number): Product[] {
  // todo
  return [];
}

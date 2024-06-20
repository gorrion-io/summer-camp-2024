import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  quantity: z.number(),
  isAlcohol: z.boolean(),
});
export type Product = z.infer<typeof ProductSchema>;

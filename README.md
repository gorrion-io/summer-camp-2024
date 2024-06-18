# Gorrion Summer Camp 2024 - recruitment task

## Getting started
Read [CONTRIBUTING.md](./CONTRIBUTING.md)

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Task
We are working on a project of web application that displays a list of goods in a convenience store. In the meantime, the client has sent us databases of products exported from previous systems, but they are in CSV and JSON formats.

**Your task is to prepare a method in the `lib/products.ts` file that will merge these lists.**

The following conditions must be met:

1. The type of a single product should have the form:

```ts
type Product = {
    id: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
    isAlcohol: boolean;
};
```

2. The client wants to temporarily hide products containing alcohol due to licensing issues, so the list must contain only non-alcohol products.

Next, you need to create an endpoint in `app/api/products` that returns a list of products. The list should be sorted in ascending order by product ID. Additionally, the data should be paginated and return 10 products per page. The endpoint should accept a `page` parameter to return the appropriate page.

The final step is to visualise the data returned from the backend, so you need to expand the existing table component in `app/products` to display data returned by the endpoint.

## Hint
You can test your solution using commands below:
```bash
npm run test
# or
yarn test
# or 
pnpm test
```
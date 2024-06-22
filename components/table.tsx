import { Product } from "@/lib/fileRead";

interface TableControlsProps {
  products: Product[];
}

export function Table({ products }: TableControlsProps) {
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold dark:text-white sm:pl-0"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white"
          >
            Quantity
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white"
          >
            Contains alcohol
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium dark:text-white sm:pl-0">
              {product.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-300">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-300">
              {product.price} {product.currency}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-300">
              {product.quantity}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-300">
              {product.isAlcohol ? "Yes" : "No"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

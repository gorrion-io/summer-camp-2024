import { PRODUCTS_TABLE_HEADERS } from "@/app/shared/consts";

const ProductsTableHead = () => {
  return (
    <thead>
      <tr>
        {PRODUCTS_TABLE_HEADERS.map((header: string) => (
          <th
            key={header}
            scope="col"
            className="py-3.5 pr-3 text-left text-sm font-semibold text-white"
          >
            {header}
          </th>
        ))}
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};

export default ProductsTableHead;

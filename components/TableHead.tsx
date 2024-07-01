import React from "react";

function TableHead() {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
        >
          ID
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Price
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Quantity
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Contains alcohol
        </th>
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;

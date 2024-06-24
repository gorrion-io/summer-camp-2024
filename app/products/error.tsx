"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-lg font-semibold mb-4">
          Couldn&apos;t fetch products
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}

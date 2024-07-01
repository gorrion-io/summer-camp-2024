"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  prodLength: number;
}

function NextPrevPage(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const querryPage = searchParams.get("page") ?? "0";
  const page = parseInt(querryPage);

  const handleNextPage = (event: any) => {
    event.preventDefault();
    if (page * 10 < props.prodLength - 10) {
      router.push(`?page=${page + 1}`);
    }
  };

  const handlePrevPage = (event: any) => {
    event.preventDefault();
    if (page > 0) {
      router.push(`?page=${Number(page) - 1}`);
    }
  };

  return (
    <div className="flex flex-1 justify-between sm:justify-end ">
      <a
        href="#/"
        className="relative ml-5 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        onClick={handlePrevPage}
      >
        Previous
      </a>
      <a
        href="#/"
        onClick={handleNextPage}
        className="relative ml-3 mr-5 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        Next
      </a>
    </div>
  );
}

export default NextPrevPage;

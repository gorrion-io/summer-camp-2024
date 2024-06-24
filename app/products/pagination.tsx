"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  total : number;
}

export default function Pagination({ page, totalPages, setPage,total }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between py-3" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm">
          Showing <span className="font-medium">{page * 10 + 1}</span> to{" "}
          <span className="font-medium">{Math.min((page + 1) * 10, totalPages * 10)}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => setPage(Math.max(page - 1, 0))}
          className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
          className="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

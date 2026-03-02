"use client";

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function JobsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JobsPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1); // Separator
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1); // Separator
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1); // Separator
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push(-1); // Separator
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded border border-gray-200 text-sm font-medium 
                   disabled:opacity-50 hover:border-primary hover:text-primary 
                   transition-colors"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {getPageNumbers().map((pageNum, index) =>
        pageNum === -1 ? (
          <span
            key={`separator-${index}`}
            className="w-10 h-10 flex items-center justify-center text-gray-500"
          >
            …
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded border text-sm font-medium transition-colors
              ${
                pageNum === currentPage
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded border border-gray-200 text-sm font-medium 
                   disabled:opacity-50 hover:border-primary hover:text-primary 
                   transition-colors"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}

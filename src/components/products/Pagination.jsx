import { useContext, useEffect } from "react";
import { ApiContext } from "../../context/apiContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { IonIcon } from '@ionic/react';

const Pagination = () => {
  const { filters, applyFilters, dataWhithPagination } = useContext(ApiContext);
  const { viewWidth } = useContext(CartContext);

  const { page } = filters;
  const totalPages = dataWhithPagination?.totalPages ?? 1;
  const maxNumbersToShow = viewWidth < 1024 ? 3 : (totalPages <= 15 ? 5 : 7);

  useEffect(() => {
    if (!filters.page || filters.page < 1) {
      applyFilters({ page: 1 });
    }
  }, [filters.page, applyFilters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      applyFilters({ page: newPage });
    }
  };

  const generatePageNumbers = () => {
    if (!totalPages || totalPages < 1) return [1];

    const pages = [];
    const half = Math.floor(maxNumbersToShow / 2);

    pages.push(1);

    let start = Math.max(2, page - half);
    let end = Math.min(totalPages - 1, page + half);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 mt-6">

      <button
        className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md text-white transition ${page === 1
          ? "bg-bgFooter cursor-not-allowed"
          : "bg-hover hover:bg-secondary"
          }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <IonIcon icon="caret-back-outline" />
      </button>

      {generatePageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={index} className="text-white px-2">...</span>
        ) : (
          <button
            key={index}
            className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md transition ${p === page
              ? "bg-white text-black font-bold"
              : "bg-hover hover:bg-secondary text-white"
              }`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md text-white transition ${page === totalPages
          ? "bg-bgFooter cursor-not-allowed"
          : "bg-hover hover:bg-secondary"
          }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <IonIcon icon="caret-forward-outline" />
      </button>
    </div>
  );
};

export default Pagination;

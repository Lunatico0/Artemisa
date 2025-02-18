import { useContext, useEffect } from "react";
import { ApiContext } from "../../context/apiContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";

const Pagination = () => {
  const { filters, applyFilters, dataWhithPagination } = useContext(ApiContext);
  const { viewWidth } = useContext(CartContext);

  const { page } = filters;
  const totalPages = dataWhithPagination?.totalPages ?? 1;
  const maxNumbersToShow = viewWidth < 1024 ? 3 : 7;

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

    const pages = new Set(); // Usamos un Set para evitar duplicados
    const half = Math.floor(maxNumbersToShow / 2);
    const isMobile = viewWidth < 1024;

    pages.add(1); // Siempre incluimos la primera página

    if (isMobile) {
      // --- Mobile Pagination ---
      if (page > 3) {
        pages.add("...");
      }

      if (page > 1 && page !== 1) {
        pages.add(page - 1);
      }

      pages.add(page); // Página actual

      if (page < totalPages && page !== totalPages) {
        pages.add(page + 1);
      }

      if (page < totalPages - 2) {
        pages.add("...");
      }
    } else {
      // --- Desktop Pagination ---
      if (page > half + 2) {
        pages.add("...");
      }

      let start = Math.max(2, page - half);
      let end = Math.min(totalPages - 1, page + half);

      if (start === 2) {
        end = Math.min(start + maxNumbersToShow - 2, totalPages - 1);
      }
      if (end === totalPages - 1) {
        start = Math.max(2, end - maxNumbersToShow + 2);
      }

      for (let i = start; i <= end; i++) {
        pages.add(i);
      }

      if (page < totalPages - half - 1) {
        pages.add("...");
      }
    }

    pages.add(totalPages); // Siempre incluimos la última página

    return Array.from(pages); // Convertimos el Set a Array antes de retornarlo
  };



  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 mt-6">

      <button
        className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md text-white transition ${page === 1
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-gray-500 hover:bg-gray-400"
          }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ion-icon name="caret-back-outline"></ion-icon>
      </button>

      {generatePageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={index} className="text-white px-2">...</span>
        ) : (
          <button
            key={index}
            className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md transition ${p === page
              ? "bg-white text-black font-bold"
              : "bg-gray-500 text-white hover:bg-gray-400"
              }`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`px-2 py-1 md:px-3 md:py-2 md:block rounded-md text-white transition ${page === totalPages
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-gray-500 hover:bg-gray-400"
          }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <ion-icon name="caret-forward-outline"></ion-icon>
      </button>
    </div>
  );
};

export default Pagination;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Paginate = ({
  pages: totalPages,
  page: currPage,
  isAdmin = false,
  keyword,
}) => {
  const min = currPage - ((currPage % 3) - 1);
  const max = min + 3;
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous */}
      <Link
        // to={currPage > 1 && `/page/${currPage - 1}`}
        to={
          currPage > 1 &&
          (!isAdmin
            ? keyword
              ? `/search/${keyword}/page/${currPage - 1}`
              : `/page/${currPage - 1}`
            : `/admin/productlist/${currPage - 1}`)
        }
        className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
      >
        Prev
      </Link>

      {/* Page Numbers */}
      {[...Array(totalPages + 1).keys()].slice(1).map((x) => (
        <Link
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x}`
                : `/page/${x}`
              : `/admin/productlist/${x}`
          }
        >
          <button
            key={x}
            className={`px-3 py-1 rounded-md border text-sm transition cursor-pointer
            ${
              currPage === x
                ? "bg-techmart-dark text-white border-techmart-color"
                : "hover:bg-gray-100"
            }`}
          >
            {x}
          </button>
        </Link>
      ))}

      {/* Next */}
      <Link
        // to={currPage < totalPages && `/page/${currPage + 1}`}
        to={
          currPage < totalPages &&
          (!isAdmin
            ? keyword
              ? `/search/${keyword}/page/${currPage + 1}`
              : `/page/${currPage + 1}`
            : `/admin/productlist/${currPage + 1}`)
        }
        className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
      >
        Next
      </Link>
    </div>
  );
};

export default Paginate;

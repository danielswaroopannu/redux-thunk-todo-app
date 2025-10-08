import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/todoSlice";

const Pagination = ({ totalItems, itemsPerPage, currentPage }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => dispatch(setPage(page))}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: currentPage === page ? "#007bff" : "#f0f0f0",
            color: currentPage === page ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
import React, { useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { PaginationContext } from "../Customers/Customers";

const Pagination = ({ previousNextPage, getPages }) => {
  const { pages, selectedPage } = useContext(PaginationContext);
  return (
    <div className="pagination">
      {pages >= 1 ? (
        <span>
          <Link to={"/"} onClick={() => previousNextPage(true)}>
            <i className="fa fa-angle-double-left"></i>
          </Link>
          {getPages(parseInt(selectedPage))}
          <Link to={"/"} onClick={() => previousNextPage(false)}>
            <i className="fa fa-angle-double-right"></i>
          </Link>
        </span>
      ) : null}
    </div>
  );
};

export default Pagination;

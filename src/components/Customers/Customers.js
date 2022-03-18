import React, { useState, useEffect, createContext, Suspense } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../../scss/Customers.scss";
import {
  CONTEXT_PATH,
  CUSTOMER_LIST,
  SEARCH_BY_USERNAME,
} from "../../constants";

export const CustomerContext = createContext();
export const PaginationContext = createContext();

const CustomerTable = React.lazy(() => import("./CustomerTable"));
const Pagination = React.lazy(() => import("../common/Pagination"));

const customersHeader = ["Full Name", "Username", "Email", "Picture", "Action"];
const filter = { userName: "", page: 1 };

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState(filter);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { userName, page } = filters;
  const { pages, customersList } = customers;

  const selectedPage = searchParams.get("page") || page;
  const searchText = searchParams.get("userName") || userName;

  useEffect(() => {
    setSearchParams({ page: selectedPage, userName: searchText });
    axios
      .get(
        `${CONTEXT_PATH}/api/customers?page=${selectedPage}&userName=${searchText}`
      )
      .then((response) => {
        const customers = response.data;
        setCustomers(customers);
      });
  }, [userName, page]);

  const getPages = (page) => {
    const pageList = [...Array(pages)].map((_, index) => {
      const pageNumber = index + 1;
      const style = pageNumber === page ? "active" : null;
      return (
        <Link
          key={pageNumber}
          to={`/`}
          className={style}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </Link>
      );
    });
    return pageList;
  };

  const changePage = (page) => {
    setFilters({ ...filters, page });
  };

  const previousNextPage = (isPrevious) => {
    let pageNumber = 1;
    const page = parseInt(selectedPage);
    if (isPrevious) {
      pageNumber = page - 1 === 0 ? pages : page - 1;
    } else {
      pageNumber = page + 1 > pages ? 1 : page + 1;
    }
    setFilters({ ...filters, page: pageNumber });
    setSearchParams({ page: pageNumber, userName: searchText });
  };

  const searchByUserName = ({ target: { value } }) => {
    const userName = value.replace(/[^A-Za-z]/gi, "");
    setFilters({ ...filters, userName, page: 1 });
    setSearchParams({ page: 1, userName });
  };

  const customerDetail = (customerId, event) => {
    event.preventDefault();
    const customer =
      customersList.find((customer) => customer.customerId === customerId) ||
      {};
    navigate("/detail", { state: customer });
  };

  return (
    <div className="container">
      <h1>{CUSTOMER_LIST}</h1>
      <div className="topnav">
        <input
          type="text"
          placeholder={SEARCH_BY_USERNAME}
          onChange={searchByUserName}
          value={searchText}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerContext.Provider value={{ customersHeader, customersList }}>
          <CustomerTable customerDetail={customerDetail} />
        </CustomerContext.Provider>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PaginationContext.Provider value={{ pages, selectedPage }}>
          <Pagination previousNextPage={previousNextPage} getPages={getPages} />
        </PaginationContext.Provider>
      </Suspense>
    </div>
  );
};

export default Customers;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NO_DATA_FOUND } from "../../constants";
import LightBox from "../common/LightBox";
import { CustomerContext } from "./Customers";

const CustomerTable = ({ customerDetail }) => {
  const { customersHeader, customersList } = useContext(CustomerContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {customersHeader.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customersList && customersList.length ? (
            customersList.map(
              ({ customerId, fullName, userName, email, image }) => {
                return (
                  <tr key={email}>
                    <td>
                      <Link
                        to={`/detail?${customerId}`}
                        onClick={(event) => customerDetail(customerId, event)}
                      >
                        {fullName}
                      </Link>
                    </td>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td>
                      <LightBox src={image} alt="image">
                        <img src={image} className="lightbox-img" alt="image" />
                      </LightBox>
                    </td>
                    <td>
                      <Link
                        to={`/detail?${customerId}`}
                        onClick={(event) => customerDetail(customerId, event)}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td colSpan="5" className="align-center">
                {NO_DATA_FOUND}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

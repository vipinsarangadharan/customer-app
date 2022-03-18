import React from "react";
import "../../scss/CustomerDetail.scss";
import { Link, useLocation } from "react-router-dom";
import { BACK, CUSTOMER_DETAILS } from "../../constants";

const CustomerDetail = () => {
  const { state } = useLocation();
  const { fullName, phoneNumber, email, address, image, gender } = state;

  return (
    <div>
      <div>
        <h2 className="profile-title">{CUSTOMER_DETAILS}</h2>
      </div>
      <div className="card">
        <img src={image} alt={fullName} />
        <h1>{fullName}</h1>
        <p className="title">{address}</p>
        <p>{email}</p>
        <p>{gender}</p>
        <p>{phoneNumber}</p>
      </div>
      <div className="btn-container">
        <button>
          <Link to="/">{BACK}</Link>
        </button>
      </div>
    </div>
  );
};

export default CustomerDetail;

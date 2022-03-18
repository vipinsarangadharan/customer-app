import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDetail from "./Customers/CustomerDetail";
import Customers from "./Customers/Customers";
import NotFound from "./common/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Customers />} />
        <Route exact path="/detail" element={<CustomerDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

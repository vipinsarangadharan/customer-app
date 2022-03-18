const http = require("http");
const url = require("url");
const data = require("./customers");
const { customersList, headers, recordsPerPage, PORT } = data;

http
  .createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    const { method } = req;
    const { page, userName } = query;
    if (pathname === "/api/customers" && method === "GET") {
      let customers = customersList;
      if (userName) {
        customers = customers.filter((customer) =>
          customer.userName.toLowerCase().includes(userName.toLowerCase())
        );
      }
      const filteredResult = customers
        .slice((page - 1) * recordsPerPage, page * recordsPerPage)
        .sort((a, b) => a.customerId - b.customerId);
      const pages = Math.ceil(customers.length / recordsPerPage);
      res.writeHead(200, headers);
      res.end(JSON.stringify({ customersList: filteredResult, pages }));
    }
  })
  .listen(PORT, () => console.log(`server start at port ${PORT}`));

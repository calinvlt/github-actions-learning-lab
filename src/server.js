const http = require("node:http");
const { greeting } = require("./greeting");

const port = Number(process.env.PORT || 3000);

const server = http.createServer((_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ message: greeting("GitHub Actions") }));
});

server.listen(port, () => {
  console.log(`Sample app listening on http://localhost:${port}`);
});

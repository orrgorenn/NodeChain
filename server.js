const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000 || process.env.PORT;

http
  .createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    console.log(`Request for ${pathName} received.`);
    fs.readFile(pathName.substr(1), (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, { "Content-Type": "text/html" });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data.toString());
      }
      res.end();
    });
  })
  .listen(3000);

console.log(`Server is running on port ${PORT}`);

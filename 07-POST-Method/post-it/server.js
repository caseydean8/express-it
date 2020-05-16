var http = require("http");
var fs = require("fs");

// Set our port to 8080
var PORT = 8080;

// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {
  let path = req.url;
  if (path === "/") path = "/index.html";
  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + path, function (err, data) {
    if (err) throw err;
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    // res.writeHead(200, { "Content-Type": "text/html" });
    // Caseys note: above line isn't necessary to render page
    res.end(data);
  });
}

// Starts our server
server.listen(PORT, function () {
  console.log("Server is listening on PORT: " + PORT);
});
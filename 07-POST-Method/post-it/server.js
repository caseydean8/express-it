var http = require("http");
const fs = require("fs");
var querystring = require("querystring");

function processPost(request, response, callback) {
  var queryData = "";
  if (typeof callback !== "function") return null;

  if (request.method == "POST") {
    request.on("data", function (data) {
      queryData += data;
      if (queryData.length > 1e6) {
        queryData = "";
        response.writeHead(413, { "Content-Type": "text/plain" }).end();
        request.connection.destroy();
      }
    });

    request.on("end", function () {
      request.post = querystring.parse(queryData);
      callback();
    });
  } else {
    response.writeHead(405, { "Content-Type": "text/plain" });
    response.end();
  }
}

// Set our port to 8080
var PORT = 8080;

// Create our server

// http.createServer(function (request, response) {
//   if (request.method == "POST") {
//     processPost(request, response, function () {
//       console.log(request.post);
//       // Use request.post here

//       response.writeHead(200, "OK", { "Content-Type": "text/plain" });
//       response.end();
//     });
//   } else {
//     response.writeHead(200, "OK", { "Content-Type": "text/plain" });
//     response.end();
//   }
// });
// .listen(8000);

var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {
  let path = req.url;
  if (path === "/") path = "/index.html";
  // Here we use the fs package to read our index.html file

  if (req.method == "POST") {
    processPost(req, res, function () {
      console.log(req.post);
      // Use request.post here

      // res.writeHead(200, "OK", { "Content-Type": "text/plain" });
      // res.end();
    });
  } else {
    // res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    fs.readFile(__dirname + "/index.html", function (err, data) {
      if (err) throw err;
      // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
      // an html file.
      // res.writeHead(200, { "Content-Type": "text/html" });
      // Caseys note: above line isn't necessary to render page
      res.end(data);
    });
    // res.end();
  }
}

// Starts our server
server.listen(PORT, function () {
  console.log("Server is listening on PORT: " + PORT);
});

// * Create an HTML file with a form that will post data.
// * Create a server that will accept the POSTed data and log it to the console.

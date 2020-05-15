const http = require("http");

const PORT = 8080;
const PORT2 = 7000;

const quotes = ["The Way Get Started Is To Quit Talking And Begin Doing. Walt Disney", "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character", "If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You. Steve Jobs", "Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do. Johann Wolfgang Von Goethe", "We Generate Fears While We Sit. We Overcome Them By Action. Dr. Henry Link"];


const handleReq = (req, res) => {
  let randQuote = Math.floor((Math.random() * 5) + 1);
  res.end(`${quotes[randQuote]}: ${req.url}`);
}

const server = http.createServer(handleReq);
const server2 = http.createServer(handleReq);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

server2.listen(PORT2, () => {
  console.log(`Server listening on: http://localhost:${PORT2}`);
});
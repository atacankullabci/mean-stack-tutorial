const http = require('http');

const server = http.createServer((request, response) => {
  response.end('Sample response');
});

console.log(process.env.PORT)

server.listen(process.env.PORT || 3000);

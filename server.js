const http = require('http');
const expressApp = require('./backend/app');

// Without Express js
// const server = http.createServer((request, response) => {
//   response.end('Sample response');
// });

const port = process.env.PORT || 3000;

// Set port inside of the Express
expressApp.set('port', this.port);

const server = http.createServer(expressApp);

server.listen(port);

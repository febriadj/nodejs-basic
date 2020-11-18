const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
  console.log(req.url, req.method);
  res.setHeader('Content-Type', 'text/html');

  // basic routing (use a switch case)
  let path = './';
  switch (req.url){
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about/data': // redirect to about page
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }
  
  // read the html file and display it on the screen
  fs.readFile(path, (err, data) => {
    if (err){
      console.log(err);
      res.end();
    } else res.end(data);
  })
})

// running the server on port 3000
server.listen(3000, 'localhost', () => {
  console.log('listening for request on port 3000');
})
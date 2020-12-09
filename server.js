const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const myDateTime = require('./modules/Date.js');

const server = http.createServer((req, res)=> {
  console.log(req.url, req.method);
  console.log(myDateTime());
  res.setHeader('Content-Type', 'text/html');

  // lodash
  const num = _.random(0, 20);
  console.log(num);

  // basic routing (use a switch case)
  let path = './views/';
  switch (req.url){
    case '/':
      path += 'index.ejs';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.ejs';
      res.statusCode = 200;
      break;
    case '/about-us': // redirect to about page
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += 'not-found.ejs';
      res.statusCode = 404;
      break;
  };
  
  // read the html file and display it on the screen
  fs.readFile(path, (err, data) => {
    if (err){
      console.log(err);
      res.end();
    } else res.end(data);
  });
});

// running the server on port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening for request on port ${port}`);
});

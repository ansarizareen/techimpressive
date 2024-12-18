const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // The file where data will be stored
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});


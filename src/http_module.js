const http = require(`http`);
const PORT = 8080;
const server = http.createServer((req, res) => {
  res.end(`hola mundo desde el back`);
});

server.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});

var restify = require('restify');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser()); 
server.use(restify.CORS());
   
var originRouter = require('./src/routers/v1/storage-router');
originRouter.applyRoutes(server); 
   
var storageInventoryRouter = require('./src/routers/v1/storage-inventory-router');
storageInventoryRouter.applyRoutes(server); 
   
var storageInventoryMovementRouter = require('./src/routers/v1/storage-inventory-movement-router');
storageInventoryMovementRouter.applyRoutes(server); 

var transferInDocRouter = require('./src/routers/v1/transfer-in-doc-router');
transferInDocRouter.applyRoutes(server); 

var transferOutDocRouter = require('./src/routers/v1/transfer-out-doc-router');
transferOutDocRouter.applyRoutes(server); 

var inventoryDocModuleRouter = require('./src/routers/v1/inventory-doc-module-router');
inventoryDocModuleRouter.applyRoutes(server); 

var ModuleRouter = require('./src/routers/v1/module-router');
ModuleRouter.applyRoutes(server); 

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)
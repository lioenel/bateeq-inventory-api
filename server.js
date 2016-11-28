// var restify = require('restify');

// var server = restify.createServer();

// server.use(restify.queryParser());
// server.use(restify.bodyParser()); 
// server.use(restify.CORS());
'use strict';

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));

var originRouter = require('./src/routers/v1/inventory/storage-router');
originRouter.applyRoutes(server, "v1/inventory/storages");

var storageInventoryRouter = require('./src/routers/v1/inventory/storage-inventory-router');
storageInventoryRouter.applyRoutes(server, "v1/inventory/storages");

var storageInventoryMovementRouter = require('./src/routers/v1/inventory/storage-inventory-movement-router');
storageInventoryMovementRouter.applyRoutes(server, "v1/inventory/storages");

var transferInDocRouter = require('./src/routers/v1/inventory/transfer-in-doc-router');
transferInDocRouter.applyRoutes(server, "v1/inventory/docs/transfer-in");

var transferOutDocRouter = require('./src/routers/v1/inventory/transfer-out-doc-router');
transferOutDocRouter.applyRoutes(server, "v1/inventory/docs/transfer-out");

var inventoryReceiveModuleRouter = require('./src/routers/v1/inventory/inventory-receive-module-router');
inventoryReceiveModuleRouter.applyRoutes(server, "v1/inventory/docs");

var inventoryDocModuleRouter = require('./src/routers/v1/inventory/inventory-doc-module-router');
inventoryDocModuleRouter.applyRoutes(server, "v1/inventory/docs");

var merchandiserDocModuleSpecifyRouter = require('./src/routers/v1/merchandiser/merchandiser-doc-module-specify-router');
merchandiserDocModuleSpecifyRouter.applyRoutes(server, "v1/merchandiser/docs");

var merchandiserDocModuleRouter = require('./src/routers/v1/merchandiser/merchandiser-doc-module-router');
merchandiserDocModuleRouter.applyRoutes(server, "v1/merchandiser/docs");

var uploadPbjRouter = require('./src/routers/v1/merchandiser/upload-csv-file-pbj-router');
uploadPbjRouter.applyRoutes(server, "v1/merchandiser/upload");

var uploadPbaRouter = require('./src/routers/v1/merchandiser/upload-csv-file-pba-router');
uploadPbaRouter.applyRoutes(server, "v1/merchandiser/upload/pba");

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)
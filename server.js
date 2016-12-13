'use strict';

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');

var passport = require('passport');
var server = restify.createServer();

var json2xls = require('json2xls');
server.use(json2xls.middleware);

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));

server.use(passport.initialize());
server.use(function (request, response, next) {
    var query = request.query;
    query.order = !query.order ? {} : JSON.parse(query.order);
    query.filter = !query.filter ? {} : JSON.parse(query.filter);
    request.queryInfo = query;
    next();
});


var storageInventoryRouter = require('./src/routers/v1/inventory/storage-inventory-router');
storageInventoryRouter.applyRoutes(server, "v1/inventory/storages");

var storageInventoryMovementRouter = require('./src/routers/v1/inventory/storage-inventory-movement-router');
storageInventoryMovementRouter.applyRoutes(server, "v1/inventory/storages");

var transferInDocRouter = require('./src/routers/v1/inventory/transfer-in-doc-router');
transferInDocRouter.applyRoutes(server, "v1/inventory/docs/transfer-in");

var transferOutDocRouter = require('./src/routers/v1/inventory/transfer-out-doc-router');
transferOutDocRouter.applyRoutes(server, "v1/inventory/docs/transfer-out");
 
var inventoryEfrKbRtpModuleRouter = require('./src/routers/v1/inventory/inventory-efr-kb-rtp-module-router');
inventoryEfrKbRtpModuleRouter.applyRoutes(server, "v1/inventory/docs/efr-kb-rtp");

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
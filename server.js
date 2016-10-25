var restify = require('restify');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser()); 
server.use(restify.CORS());
   
var originRouter = require('./src/routers/v1/inventory/storage-router');
originRouter.applyRoutes(server); 
    
var storageInventoryRouter = require('./src/routers/v1/inventory/storage-inventory-router');
storageInventoryRouter.applyRoutes(server); 
   
var storageInventoryMovementRouter = require('./src/routers/v1/inventory/storage-inventory-movement-router');
storageInventoryMovementRouter.applyRoutes(server); 

var transferInDocRouter = require('./src/routers/v1/inventory/transfer-in-doc-router');
transferInDocRouter.applyRoutes(server); 

var transferOutDocRouter = require('./src/routers/v1/inventory/transfer-out-doc-router');
transferOutDocRouter.applyRoutes(server); 

var inventoryReceiveModuleRouter = require('./src/routers/v1/inventory/inventory-receive-module-router');
inventoryReceiveModuleRouter.applyRoutes(server); 

var inventoryDocModuleRouter = require('./src/routers/v1/inventory/inventory-doc-module-router');
inventoryDocModuleRouter.applyRoutes(server); 

var merchandiserDocModuleSpecifyRouter = require('./src/routers/v1/merchandiser/merchandiser-doc-module-specify-router');
merchandiserDocModuleSpecifyRouter.applyRoutes(server);  

var merchandiserDocModuleRouter = require('./src/routers/v1/merchandiser/merchandiser-doc-module-router');
merchandiserDocModuleRouter.applyRoutes(server);  
 
var masterStoreRouter = require('./src/routers/v1/master/store-router');
masterStoreRouter.applyRoutes(server);  
var masterBankRouter = require('./src/routers/v1/master/bank-router');
masterBankRouter.applyRoutes(server); 
var masterCardTypeRouter = require('./src/routers/v1/master/card-type-router');
masterCardTypeRouter.applyRoutes(server); 

var salesModuleRouter = require('./src/routers/v1/sales/sales-module-router');
salesModuleRouter.applyRoutes(server);  
var salesRewardTypeRouter = require('./src/routers/v1/sales/reward-type-router');
salesRewardTypeRouter.applyRoutes(server);
var salesPromoRouter = require('./src/routers/v1/sales/promo-router');
salesPromoRouter.applyRoutes(server); 


server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)
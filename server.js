var restify = require('restify');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser()); 
server.use(restify.CORS());
   
var originRouter = require('./src/routers/v1/inventory/storage-router');
originRouter.applyRoutes(server); 
   
var storeRouter = require('./src/routers/v1/inventory/store-router');
storeRouter.applyRoutes(server); 
   
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
 
var paymentDocModuleRouter = require('./src/routers/v1/pos/payment-doc-module-router');
paymentDocModuleRouter.applyRoutes(server);  

var posMasterBankRouter = require('./src/routers/v1/pos-master/bank-router');
posMasterBankRouter.applyRoutes(server); 

var posMasterCardTypeRouter = require('./src/routers/v1/pos-master/card-type-router');
posMasterCardTypeRouter.applyRoutes(server); 

var posMasterPaymentTypeRouter = require('./src/routers/v1/pos-master/payment-type-router');
posMasterPaymentTypeRouter.applyRoutes(server); 

var promoRewardTypeRouter = require('./src/routers/v1/promo/reward-type-router');
promoRewardTypeRouter.applyRoutes(server);

var promoRouter = require('./src/routers/v1/promo/promo-router');
promoRouter.applyRoutes(server); 


server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)
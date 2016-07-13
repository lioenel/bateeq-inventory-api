var restify = require('restify');

var server = restify.createServer();
// server.use(function allowCors(request, response, next){
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     next();
// })
server.use(restify.queryParser());
server.use(restify.bodyParser());


// Lets try and fix CORS support
// By default the restify middleware doesn't do much unless you instruct
// it to allow the correct headers.
//
// See issues:
// https://github.com/mcavage/node-restify/issues/284 (closed)
// https://github.com/mcavage/node-restify/issues/664 (unresolved)
//
// What it boils down to is that each client framework uses different headers
// and you have to enable the ones by hand that you may need.
// The authorization one is key for our authentication strategy
//
// restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
// restify.CORS.ALLOW_HEADERS.push('Accept-Language');
// restify.CORS.ALLOW_HEADERS.push("authorization");
// restify.CORS.ALLOW_HEADERS.push("withcredentials");
// restify.CORS.ALLOW_HEADERS.push("x-requested-with");
// restify.CORS.ALLOW_HEADERS.push("x-forwarded-for");
// restify.CORS.ALLOW_HEADERS.push("x-real-ip");
// restify.CORS.ALLOW_HEADERS.push("x-customheader");
// restify.CORS.ALLOW_HEADERS.push("user-agent");
// restify.CORS.ALLOW_HEADERS.push("keep-alive");
// restify.CORS.ALLOW_HEADERS.push("host");
// restify.CORS.ALLOW_HEADERS.push("accept");
// restify.CORS.ALLOW_HEADERS.push("connection");
// restify.CORS.ALLOW_HEADERS.push("upgrade");
// restify.CORS.ALLOW_HEADERS.push("content-type");
// restify.CORS.ALLOW_HEADERS.push("dnt"); // Do not track
// restify.CORS.ALLOW_HEADERS.push("if-modified-since");
// restify.CORS.ALLOW_HEADERS.push("cache-control");

server.use(restify.CORS({
    credentials: true
    // origins: ['http://localhost:9000'],
    // headers: ['Accept-Encoding', 'Accept-Language', 'authorization', 'withcredentials', 'x-requested-with', 'x-forwarded-for', 'x-real-ip', 'x-customheader', 'user-agent', 'keep-alive', 'host', 'accept', 'connection', 'upgrade', 'content-type', 'dnt', 'if-modified-since', 'cache-control']
}));

server.opts(/\.*/, function (req, res, next) {
  res.send(200);
  next();
});

// Manually implement the method not allowed handler to fix failing preflights
//
// server.on( "MethodNotAllowed", function( request, response )
// {
//     // if ( request.method.toUpperCase() === "OPTIONS" )
//     // {
//         // Send the CORS headers
//         //
//         response.header( "Access-Control-Allow-Credentials", true                                    );
//         response.header( "Access-Control-Allow-Headers",     restify.CORS.ALLOW_HEADERS.join( ", " ) );
//         response.header( "Access-Control-Allow-Methods",     "GET, POST, PUT, DELETE, OPTIONS"       );
//         response.header( "Access-Control-Allow-Origin",      '*'                  );
//         response.header( "Access-Control-Max-Age",           0                                       );
//         response.header( "Content-type",                     "text/plain charset=UTF-8"              );
//         response.header( "Content-length",                   0                                       );

//         response.send( 204 );
//     // }
//     // else
//     // {
//     //     response.send( new restify.MethodNotAllowedError() );
//     // }
// } );


var originRouter = require('./src/routers/storage-router');
originRouter.applyRoutes(server);

 


server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)
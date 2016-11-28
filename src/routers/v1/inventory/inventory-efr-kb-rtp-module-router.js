var Router = require('restify-router').Router;;
var router = new Router();
var map = require('bateeq-module').inventory.map;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;

const apiVersion = '1.0.0';
   
router.get('/exportall', (request, response, next) => {
    db.get().then(db => {
        var Manager = map.get("efr-kb-rtp");
        var manager = new Manager(db, {
            username: 'router'
        }); 
        
        var query = request.query;
         
        manager.read(query)
            .then(docs => {

                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                
                var dateFormat = "DD MMM YYYY";
                var locale = 'id-ID';
                var moment = require('moment');
                moment.locale(locale);
                
                var data = [];
                var index = 0;
                for (var document of result.data) { 
                    for(var item of document.items) {
                         var _data = {
                            "Nomor Referensi": document.code,
                            "Dari": document.source.code,
                            "Ke": document.destination.code,
                            "Barcode": item.item.code,
                            "Nama": item.item.name,
                            "QTY": item.quantity,
                            "Catatan": item.remark
                        }
                        data.push(_data); 
                    } 
                }

                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    var result = resultFormatter.ok(apiVersion, 200, data);
                    response.send(200, result);
                } else {
                    var options = {
                        "Nomor Referensi": "string",
                        "Dari": "string",
                        "Ke": "string",
                        "Barcode": "string",
                        "Nama": "string",
                        "QTY": "number",
                        "Catatan": "string"
                    };
                    response.xls(`Report RTP - ${moment(new Date()).format(dateFormat)}.xlsx`, data, options);
                }
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});


module.exports = router;
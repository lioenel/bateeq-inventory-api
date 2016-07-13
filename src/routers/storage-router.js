var Router = require('restify-router').Router;;
var router = new Router();
var StorageManager = require('bateeq-module').inventory.StorageManager;
var db = require('../db');

router.get('inventories/storages', (request, response, next) => {
    db.get().then(db => {
        var manager = new StorageManager(db, {
            username: 'router'
        });
        
        var query = request.query;

        manager.read(query)
            .then(docs => {
                response.send(docs);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.get('inventories/storages/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new StorageManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;

        manager.getById(id)
            .then(doc => {
                response.send(doc);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.post('inventories/storages', (request, response, next) => {
    db.get().then(db => {
        var manager = new StorageManager(db, {
            username: 'router'
        });
        
        var data = request.body;

        manager.create(data)
            .then(docId => {
                response.header('Location', `inventories/storages/${docId.toString()}`);
                response.send(201);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.put('inventories/storages/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new StorageManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;
        var data = request.body;

        manager.update(data)
            .then(docId => {
                response.send(200);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.del('inventories/storages/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new StorageManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;
        var data = request.body;

        manager.delete(data)
            .then(docId => {
                response.send(200);
            })
            .catch(e => {
                next(e);
            })
    })
});


module.exports = router;
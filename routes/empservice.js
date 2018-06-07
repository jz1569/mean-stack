const express= require('express');
const  router= express.Router();
var ed = require('./dao/empdao');
var MongoClient = require('mongodb').MongoClient;

var uri="mongodb://localhost:27017/mercury";

router.get('/emp', (req, res) => {
    MongoClient.connect(uri, (err, db) => {
        ed.getAllEmp(db, (result) => {
            res.json(result);
            db.close();
        });
    });
});

router.get('/emp/:name', (req,res) => {
    const name = req.params.name;
    MongoClient.connect(uri,(err,db) => {
        ed.getOneEmp(db, name, (result)=>{
            res.json(result);
            db.close();
        });
    });
});

router.post('/emp', (req, res) =>{
    const emp = req.body;
    MongoClient.connect(uri, (err, db) => {
        ed.saveOneEmp(db, emp, (result) => {
            res.json(result);
            db.close();
        });
    });
});

module.exports = router;
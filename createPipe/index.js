'use strict';

var mysql = require('mysql');
var https = require('https');
var dbf = require('./db_fxns');
var hf = require('./https_fxns.js');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var httpsOptions = hf.getHTTPSOptions();
        https.get(httpsOptions, function(res) {
            var nextID = '';
            res.on('data', function (chunk) {
                nextID += chunk;
            });
            res.on('end', function() {
                nextID = nextID.replace(/['"]+/g, '');
                var queryString = 'INSERT INTO p (id, name, acquire_date, maker, country, acquire_cost, '+
                    'dedication, active, sale_date, sale_price, last_update) VALUES ('+
                    connection.escape(nextID)+', '+
                    connection.escape(event.name)+', '+
                    connection.escape(event.acquire_date)+', '+
                    connection.escape(event.maker)+', '+
                    connection.escape(event.country)+', '+
                    connection.escape(event.acquire_cost)+', '+
                    connection.escape(event.dedication)+', '+
                    connection.escape(event.active)+', '+
                    connection.escape(event.sale_date)+', '+
                    connection.escape(event.sale_price)+', '+
                    "'"+(new Date()).toISOString().substring(0, 10)+"'"+');';

                console.log(queryString);
                connection.query(queryString, function(err,rows,fields) {
                    dbf.handleDBError(err, callback);
                    connection.end(dbf.handleDBErrorAndCallback(err,callback,nextID));
                });
            });
        });
    });
}

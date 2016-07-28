'use strict';

var mysql = require('mysql');
var https = require('https');

function handleDBError(err, callback) {
    if (err) {
        console.error('db error: ' + err.code);
        callback(err);
    }
}

function connectionEndCallback(err,callback,data) {
    handleDBError(err, callback);
    callback(err, data);
}

exports.handler = (event, context, callback) => {
    var connection = mysql.createConnection({
      host     : 'smokedb.cbdgympjbxbz.us-west-2.rds.amazonaws.com',
      user     : 'smokedbmaster',
      password : 'smokedbttforme3',
      database : 'smoketest',
    });
    connection.connect(function(err) {
        var id = null;
        handleDBError(err, callback);
        var httpsOptions = {
            hostname: 'u9f57ctlmf.execute-api.us-west-2.amazonaws.com',
            port: 443,
            path: '/beta/id',
            headers: {
                'x-api-key': 'T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5'
            }
        }
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

                connection.query(queryString, function(err,rows,fields) {
                    handleDBError(err, callback);
                    connection.end(connectionEndCallback(err,callback,nextID));
                });
            });
        });
    });
}

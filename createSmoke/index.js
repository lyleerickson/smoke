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
            var nextIDString = '';
            res.on('data', function (chunk) {
                nextIDString += chunk;
            });
            res.on('end', function() {
                var nextIDObj = JSON.parse(nextIDString);
                var nextID = nextIDObj.id;
                nextID.replace(/['"]+/g, '');
                var queryString = 'INSERT INTO smoke (id, smoke_date, pipe, tin, location, tin_note, packing_note, smoking_note, '+
                    'finish_note, loc_lat_long, last_update) VALUES ('+
                    connection.escape(nextID)+', '+
                    connection.escape(event.smoke_date)+', '+
                    connection.escape(event.pipe)+', '+
                    connection.escape(event.tin)+', '+
                    connection.escape(event.location)+', '+
                    connection.escape(event.tin_note)+', '+
                    connection.escape(event.packing_note)+', '+
                    connection.escape(event.smoking_note)+', '+
                    connection.escape(event.finish_note)+', '+
                    'ST_GeomFromText(\'POINT('+connection.escape(event.latitude)+' '+connection.escape(event.longitude)+')\'), '+
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

'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        connection.query('SELECT cleaning.*, pipe.name FROM cleaning, pipe WHERE pipe.id=cleaning.pipe and cleaning.id='+connection.escape(event.id)+';', function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

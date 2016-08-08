'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        connection.query('SELECT * FROM pipe WHERE id='+connection.escape(event.pipeid)+';', function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

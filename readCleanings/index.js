'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var sqlString = 'SELECT cleaning.*, pipe.name FROM cleaning, pipe ';

        if (event.id) {
            sqlString+='WHERE cleaning.id='+connection.escape(event.id)+' AND pipe.id=cleaning.pipe';
        } else {
            sqlString+='WHERE pipe.id=cleaning.pipe ORDER by clean_date DESC;';
        }
        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

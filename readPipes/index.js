'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);

        if (event.bsc) {
            // Need to replace with actual smokes query
            connection.query('SELECT pipe.* FROM pipe LEFT JOIN cleaning ON ( pipe.id = cleaning.pipe ) WHERE  cleaning.pipe IS NULL;', function(err, rows) {

                dbf.handleDBError(err,callback);
                connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
            });
        } else {
            connection.query('SELECT * FROM pipe ORDER by active DESC, sale_date, dedication, acquire_date;', function(err, rows) {

                dbf.handleDBError(err,callback);
                connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
            });
        }
    });
}

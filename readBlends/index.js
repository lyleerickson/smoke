'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var queryString = 'SELECT * FROM blend ORDER by maker, name;';
        if (event.includeOnlyUnowned) {
            queryString = 'SELECT blend.* FROM blend LEFT JOIN tin ON (blend.id=tin.blend) WHERE tin.blend IS NULL;';
        } else if (event.id) {
            queryString = 'SELECT * FROM blend WHERE blend.id='+connection.escape(event.id)+';';
        }

        connection.query(queryString, function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

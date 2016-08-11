'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        connection.query('SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, blend.image_file FROM tin, blend WHERE tin.blend=blend.id and tin.id='+connection.escape(event.id)+';', function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();

    if (event.id) {
        connection.connect(function(err) {
            var id = null;
            dbf.handleDBError(err, callback);
            connection.query('SELECT smoke.id FROM smoke WHERE tin='+connection.escape(event.id), function(err, rows) {

                dbf.handleDBError(err,callback);
                if (rows.length==0) {

                    connection.query('DELETE FROM tin WHERE id='+connection.escape(event.id), function(err, result) {

                        dbf.handleDBError(err,callback);
                        var r = event.id + " not found";
                        if (result.affectedRows > 0) {
                            r = event.id + " deleted";
                        }
                        connection.end(dbf.handleDBErrorAndCallback(err,callback,r));
                    });
                } else {
                    connection.end(dbf.handleDBErrorAndCallback(err,callback,"can't delete tin with associated smokes"));
                }
            });
        });
    } else {
        callback("no id");
    }
}

'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {
    if (event.id) {
        var connection = dbf.getDBConnection();
        var updateQuery = 'UPDATE smoke SET ';
        var notTheFirst = false;
        for (var k in event) {
            if (event.hasOwnProperty(k)) {
                if (notTheFirst) {
                    updateQuery+=', '
                }
                updateQuery+=k+'='+connection.escape(event[k])+' ';
                notTheFirst = true;
            }
        }
        updateQuery+='WHERE id='+connection.escape(event.id)+';'

        connection.connect(function(err) {
            dbf.handleDBError(err, callback);
            connection.query(updateQuery, function(err, result) {
                dbf.handleDBError(err,callback);
                var r = event.id + " not found";
                if (result.affectedRows > 0) {
                    r = event.id + " updated";
                }
                connection.end(dbf.handleDBErrorAndCallback(err,callback,r));
            });
        });
    } else {
        callback("no id");
    }
}

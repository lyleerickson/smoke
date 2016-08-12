'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE smoke.id='+connection.escape(event.id)+' AND smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id;';

        connection.query(queryString, function(err, rows) {

            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

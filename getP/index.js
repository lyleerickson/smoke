'use strict';

var mysql = require('mysql');

function handleDBError(err, callback) {
    if (err) {
        console.error('db error: ' + err.code);
        callback(err);
    }
}

function connectionEndCallback(err,callback,data) {
    handleDBError(err, callback);
    callback(err, data);
}

exports.handler = (event, context, callback) => {
    if (event.id) {
        var connection = mysql.createConnection({
          host     : 'smokedb.cbdgympjbxbz.us-west-2.rds.amazonaws.com',
          user     : 'smokedbmaster',
          password : 'smokedbttforme3',
          database : 'smoketest',
        });
        connection.connect(function(err) {
            var id = null;
            handleDBError(err, callback);
            connection.query('SELECT * FROM p WHERE id='+connection.escape(event.id), function(err, rows) {
                handleDBError(err,callback);
                var r = event.id + " not found";
                if (rows.length > 0) {
                    r = rows;
                }
                connection.end(connectionEndCallback(err,callback,r));
            });
        });
    } else {
        callback("no id");
    }
}

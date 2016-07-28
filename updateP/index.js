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
        var updateQuery = 'UPDATE p SET ';
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

        console.log(updateQuery);

        connection.connect(function(err) {
            handleDBError(err, callback);
            connection.query(updateQuery, function(err, result) {
                handleDBError(err,callback);
                var r = event.id + " not found";
                if (result.affectedRows > 0) {
                    r = event.id + " updated";
                }
                connection.end(connectionEndCallback(err,callback,r));
            });
        });
    } else {
        callback("no id");
    }
}

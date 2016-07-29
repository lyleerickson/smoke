'use strict';

function handleDBError(err, callback) {
    if (err) {
        console.error('db error: ' + err.code);
        callback(err);
    }
}

function handleDBErrorAndCallback(err,callback,data) {
    handleDBError(err, callback);
    callback(err, data);
}

function getDBConnection() {

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host     : 'smokedb.cbdgympjbxbz.us-west-2.rds.amazonaws.com',
        user     : 'smokedbmaster',
        password : 'smokedbttforme3',
        database : 'smoketest',
    });

    return connection;
}

module.exports.handleDBError = handleDBError;
module.exports.handleDBErrorAndCallback = handleDBErrorAndCallback;
module.exports.getDBConnection = getDBConnection;
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
        host     : process.env.smoked_host,
        user     : process.env.smoked_user,
        password : process.env.smoked_pwd,
        database : process.env.smoked_db,
    });

    return connection;
}

module.exports.handleDBError = handleDBError;
module.exports.handleDBErrorAndCallback = handleDBErrorAndCallback;
module.exports.getDBConnection = getDBConnection;
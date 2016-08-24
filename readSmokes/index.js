'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var queryString = "";

        if (event.pipeID) {
            queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE pipe.id='+connection.escape(event.pipeID)+' AND '+
                          'smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id ORDER BY smoke_date DESC, smoke.id DESC;';
        } else if (event.blendID) {
            queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE blend.id='+connection.escape(event.blendID)+' AND '+
                          'smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id ORDER BY smoke_date DESC, smoke.id DESC;';
        } else if (event.tinID) {
            queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE tin.id='+connection.escape(event.tinID)+' AND '+
                          'smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id ORDER BY smoke_date DESC, smoke.id DESC;';
        } else if (event.id) {
            queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE smoke.id='+connection.escape(event.id)+' AND smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id;';

        } else {
            queryString = 'SELECT smoke.*, pipe.name as pipe_name, blend.name as blend_name FROM smoke, pipe, tin, blend '+
                          'WHERE smoke.pipe=pipe.id AND smoke.tin=tin.id AND tin.blend=blend.id ORDER BY smoke_date DESC, smoke.id DESC ';
            if (event.limitResults) {
                queryString+='LIMIT '+event.limitResults;
            }

            queryString+=';'
        }

        connection.query(queryString, function(err, rows) {
            dbf.handleDBError(err,callback);
            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

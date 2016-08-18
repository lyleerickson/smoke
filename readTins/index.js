'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var results = [];
        var queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
            'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id ORDER by tin_number;';

        if (event.onlyOpen) {
            queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
                          'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id '+
                          'AND tin.open_date IS NOT NULL AND tin.open_date NOT LIKE \'0%\' '+
                          'AND (tin.finish_date IS NULL OR tin.finish_date LIKE \'0%\')  '+
                          'ORDER by tin.open_date;';
        } else if (event.blendID) {
            queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
                        'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id and '+
                        'blend.id='+connection.escape(event.blendID)+' ORDER by tin_number;';
        } else if (event.tinID) {
            queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
                          'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id and '+
                          'tin.id='+connection.escape(event.tinID)+';'
        }

        connection.query(queryString, function(err, rows) {

            dbf.handleDBError(err,callback);
            results=rows;
            var sqlString = 'SELECT tin.id, count(smoke.id) AS total_smokes, max(smoke.smoke_date) AS last_smoked '+
                            'FROM tin, smoke '+
                            'WHERE tin.id = smoke.tin '+
                            'GROUP BY tin.id;';

            connection.query(sqlString, function(err, rows) {

                dbf.handleDBError(err,callback);
                for (var i=0; i<results.length; i++) {
                    for (var j=0; j<rows.length; j++) {
                        if (rows[j].id == results[i].id) {
                            results[i].total_smokes = rows[j].total_smokes;
                            results[i].last_smoked = rows[j].last_smoked;
                        }
                    }
                }
                connection.end(dbf.handleDBErrorAndCallback(err,callback,results));
            });
        });
    });
}

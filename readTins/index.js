'use strict';

var mysql = require('mysql');
var https = require('https');
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
                          'blend.image_file, blend.blending_component, smoke.smoke_date AS last_smoke_id, smoke.id AS last_smoke_id '+
                          'FROM tin, blend, smoke, '+
                          ' (SELECT MAX(smoke_date) AS last_smoked, tin.id AS sub_tin_id '+
                          '	 FROM tin, smoke '+
                          '	 WHERE tin.id=smoke.tin '+
                          '  GROUP BY tin.id) AS sub '+
                          '  WHERE tin.blend=blend.id AND smoke.tin=tin.id AND tin.id=sub_tin_id AND smoke.smoke_date=sub.last_smoked '+
                          'AND tin.open_date IS NOT NULL AND tin.open_date > CAST(\'0001-01-01\' AS DATE) '+
                          'AND (tin.finish_date IS NULL OR tin.finish_date < CAST(\'0001-01-01\' AS DATE)) '+
                          'ORDER BY smoke.smoke_date, smoke.id;';
        } else if (event.blendID) {
            queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
                        'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id and '+
                        'blend.id='+connection.escape(event.blendID)+' ORDER by tin_number;';
        } else if (event.id) {
            queryString = 'SELECT tin.*, blend.name, blend.maker, blend.country, blend.cut, blend.style, '+
                          'blend.image_file, blend.blending_component FROM tin, blend WHERE tin.blend=blend.id and '+
                          'tin.id='+connection.escape(event.id)+';'
        }

        connection.query(queryString, function(err, rows) {

            dbf.handleDBError(err,callback);
            results=rows;
            var sqlString = 'SELECT tin.id, count(smoke.id) AS total_smokes, MAX(smoke.smoke_date) AS last_smoked, '+
                            'MAX(smoke.id) AS last_smoked_id '+
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
                var httpsOptions = {
                    hostname: 'vyvrxxzwi9.execute-api.us-west-2.amazonaws.com',
                    port: 443,
                    path: '/beta/history',
                    headers: {
                        'x-api-key': 'T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5'
                    }
                };
                https.get(httpsOptions, function(res) {
                    var historyString = '';
                    res.on('data', function (chunk) {
                        historyString += chunk;
                    });
                    res.on('end', function() {
                        var historyJSON = JSON.parse(historyString);
                        for (var i=0; i<results.length; i++) {
                            if (results[i].open_date && (results[i].open_date+'').substring(0,1)!='0') {
                                if (!results[i].finish_date || !(results[i].finish_date+'').substring(0,1)!='0') {
                                    results[i].bowls_left = (results[i].grams-(results[i].total_smokes*historyJSON.avg_grams_bowl))/historyJSON.avg_grams_bowl;
                                }
                            }
                        }
                        connection.end(dbf.handleDBErrorAndCallback(err,callback,results));
                    });
                });
            });
        });
    });
}

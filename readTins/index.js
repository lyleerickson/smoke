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

        if (event.blendID) {
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
            if (event.onlyOpen) {
                for (var i=0; i<rows.length; i++) {
                    if ((rows[i].open_date && rows[i].open_date!='' && (rows[i].open_date+"").substring(0, 4)!='0000') &&
                        (!rows[i].finish_date || rows[i].finish_date=='' || (rows[i].finish_date+"").substring(0, 4)=='0000')) {
                        results.push(rows[i]);
                    }
                }
            } else {
                results=rows;
            }
            var sqlString = 'SELECT tin.id, smoke.smoke_date AS last_smoked, MAX(smoke.id) AS last_smoked_id, total_smokes '+
                            'FROM tin, blend, smoke,  '+
                            '   (SELECT MAX(smoke_date) AS last_smoke, tin.id AS sub_tin_id FROM tin, smoke WHERE tin.id=smoke.tin GROUP BY tin.id) AS sub, '+
                            '   (SELECT count(smoke.id) AS total_smokes, tin.id as sub2_tin_id from tin, smoke WHERE tin.id=smoke.tin GROUP BY tin.id) as sub2 '+
                            'WHERE tin.blend=blend.id AND smoke.tin=tin.id AND tin.id=sub_tin_id AND smoke.smoke_date= last_smoke AND tin.id=sub2_tin_id '+
                            'GROUP BY tin.id ORDER BY smoke.smoke_date, smoke.id;';

            connection.query(sqlString, function(err, rows) {

                dbf.handleDBError(err,callback);
                for (var i=0; i<results.length; i++) {
                    results[i].total_smokes = 0;
                }
                for (var i=0; i<results.length; i++) {
                    for (var j=0; j<rows.length; j++) {
                        if (rows[j].id == results[i].id) {
                            results[i].total_smokes = rows[j].total_smokes;
                            results[i].last_smoked = rows[j].last_smoked;
                            results[i].last_smoked_id = rows[j].last_smoked_id;
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
                                if (!results[i].finish_date || (results[i].finish_date+'').substring(0,1)=='0') {
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

'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var sqlString = 'SELECT pipe_sub.*, count(smoke.id) AS total_bowls_since_cleaned '+
                        'FROM '+
	                        '(SELECT pipe.*, count(smoke.id) AS total_bowls, max(cleaning.clean_date) AS last_clean_date, count(cleaning.id) AS total_bowls_since_cleaned, max(smoke.smoke_date) AS last_smoke_date '+
	                        'FROM pipe '+
	                        'LEFT JOIN (smoke) ON (pipe.id=smoke.pipe) '+
	                        'LEFT JOIN (cleaning) ON (pipe.id=cleaning.pipe) '+
                            'WHERE pipe.id='+connection.escape(event.id)+') pipe_sub '+
                        'LEFT JOIN (smoke) ON (pipe_sub.id=smoke.pipe and smoke.smoke_date > pipe_sub.last_clean_date) '+
                        'GROUP BY pipe_sub.id;';
                        
        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);

            if (rows[0].last_smoke_date && rows[0].last_smoke_date!='') {
                var lastSmokeDate = new Date(rows[0].last_smoke_date);
                var today = new Date();
                rows[0].days_rest = Math.floor((today-lastSmokeDate)/8.64e+7);
            }

            var acquireCostPerSmoke;
            if (rows[0].acquire_cost && rows[0].total_bowls) {
                acquireCostPerSmoke = rows[0].acquire_cost / rows[0].total_bowls;
            } else {
               acquireCostPerSmoke=0.00;
            }
            rows[0].acquire_cost_per_smoke = acquireCostPerSmoke.toFixed(2);

            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });

//            dbf.handleDBError(err,callback);
//
//            var pipesJSON = rows;
//            var pipeJSON = pipesJSON[0];
//            var maxCleaningDate = pipeJSON.last_clean_date;
//
//            if (maxCleaningDate) {
//                sqlString = 'SELECT count(smoke.id) AS total_bowls_since_cleaned '+
//                            'FROM pipe, smoke '+
//                            'WHERE pipe.id=smoke.pipe AND smoke.smoke_date > '+connection.escape(pipeJSON.last_clean_date)+' AND pipe.id='+connection.escape(event.id)+';'
//            } else {
//                sqlString = 'SELECT count(smoke.id) AS total_bowls_since_cleaned '+
//                                        'FROM pipe, smoke '+
//                                        'WHERE pipe.id=smoke.pipe AND pipe.id='+connection.escape(event.id)+';'
//            }
//            connection.query(sqlString, function(err, rows) {
//
//                dbf.handleDBError(err,callback);
//
//                pipesJSON[0].total_bowls_since_cleaned = rows[0].total_bowls_since_cleaned;
//
//                if (pipeJSON.last_smoke_date && pipeJSON.last_smoke_date!='') {
//                    var lastSmokeDate = new Date(pipeJSON.last_smoke_date);
//                    var today = new Date();
//                    pipesJSON[0].days_rest = Math.floor((today-lastSmokeDate)/8.64e+7);
//                }
//
//                var acquireCostPerSmoke;
//                if (pipeJSON.acquire_cost && pipeJSON.total_bowls) {
//                    acquireCostPerSmoke = pipeJSON.acquire_cost / pipeJSON.total_bowls;
//                } else {
//                    acquireCostPerSmoke=0.00;
//                }
//                pipesJSON[0].acquire_cost_per_smoke = acquireCostPerSmoke.toFixed(2);
//
//                connection.end(dbf.handleDBErrorAndCallback(err,callback,pipesJSON));
//            });
//        });
    });
}

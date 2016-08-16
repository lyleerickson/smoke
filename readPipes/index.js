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
	                        'GROUP BY pipe.id '+
	                        'ORDER by active DESC, sale_date, dedication, acquire_date) pipe_sub '+
                        'LEFT JOIN (smoke) ON (pipe_sub.id=smoke.pipe and smoke.smoke_date > pipe_sub.last_clean_date) '+
                        'GROUP BY pipe_sub.id;';

        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);
            for (var i=0; i<rows.length; i++) {

                if (rows[i].last_smoke_date && rows[i].last_smoke_date!='') {
                    var lastSmokeDate = new Date(rows[i].last_smoke_date);
                    var today = new Date();
                    rows[i].days_rest = Math.floor((today-lastSmokeDate)/8.64e+7);
                }

                var acquireCostPerSmoke;
                if (rows[i].acquire_cost && rows[i].total_bowls) {
                    acquireCostPerSmoke = rows[i].acquire_cost / rows[i].total_bowls;
                } else {
                   acquireCostPerSmoke=0.00;
                }
                rows[i].acquire_cost_per_smoke = acquireCostPerSmoke.toFixed(2);
            }

            if (event.bsc) {
                var bscArray = [];
                for (var i=0; i<rows.length; i++) {
                    if (rows[i].total_bowls_since_cleaned > event.bsc) {
                        bscArray.push(rows[i]);
                    }
                }
                rows=bscArray;
            }

            connection.end(dbf.handleDBErrorAndCallback(err,callback,rows));
        });
    });
}

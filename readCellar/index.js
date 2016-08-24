'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');
var gst = require('./getstyletotals');
var gat = require('./getagetotals');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

    dbf.handleDBError(err, callback);
    var results = {};
    results.total_tins = 0;
    results.total_grams = 0;
    results.total_acquire_cost = 0;
    var sqlString = 'SELECT tin.id, tin.package_date, tin.acquire_date, tin.grams, tin.acquire_cost, blend.style '+
                    'FROM tin, blend WHERE tin.blend=blend.id AND ((tin.open_date IS NULL OR tin.open_date < CAST(\'0001-01-01\' AS DATE)) AND (tin.finish_date IS NULL OR tin.finish_date < CAST(\'0001-01-01\' AS DATE)));';

        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);
            var totalMilliSecDiff = 0;
            for (var i=0; i<rows.length; i++) {
                var start_date;
                var today = new Date();
                if (rows[i].package_date && (rows[i].package_date+"").substring(0,1)!="0") {
                    var package_date = new Date(rows[i].package_date);
                    var acquire_date = new Date(rows[i].acquire_date);
                    if (package_date < acquire_date) {
                        start_date = package_date;
                    } else {
                        start_date = acquire_date;
                    }
                } else {
                    start_date = new Date(rows[i].acquire_date);
                }
                totalMilliSecDiff += (today-start_date);
                results.total_tins++;
                results.total_grams += rows[i].grams;
                results.total_acquire_cost += rows[i].acquire_cost;
            }
            var styleTotals = gst.getStyleTotals(rows);
            var ageTotals = gat.getAgeTotals(rows);
            results.styleTotals = styleTotals;
            results.ageTotals = ageTotals;
            results.average_age = totalMilliSecDiff / results.total_tins / 3.154e+10;
            connection.end(dbf.handleDBErrorAndCallback(err,callback,results));
        });
    });
}

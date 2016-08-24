'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');
var gst = require('./getstyletotals');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var total_bowls = 0;
        var total_tin_acquire_cost = 0;
        var total_finished_tins = 0;
        var total_finished_grams = 0;
        var total_finished_tin_acquire_cost = 0
        var finished_tins_per_style = [];
        var avg_grams_bowl = 0;
        var avg_bowls_week = 0;
        var avg_bowls_week_last_six_months = 0;
        var avg_cost_smoke_with_cellar = 0;
        var avg_cost_smoke_sans_cellar = 0;
        var smoke_start_date;
        var total_pipe_acquire_costs = 0;
        var total_pipe_sale_prices = 0;
        var results = {};

        var sqlString = 'SELECT count(smoke.id) AS total_bowls, min(smoke.smoke_date) AS smoke_start_date FROM smoke;'

        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);
            total_bowls = rows[0].total_bowls;
            smoke_start_date = rows[0].smoke_start_date;
            total_tin_acquire_cost = rows[0].total_tin_acquire_cost;
            sqlString = 'SELECT count(tin.id) as total_finished_tins, sum(tin.acquire_cost) AS total_finished_tin_acquire_cost, sum(tin.grams) AS total_finished_grams '+
                        'FROM tin WHERE tin.finish_date IS NOT NULL AND tin.finish_date > CAST(\'0001-01-01\' AS DATE);';

            connection.query(sqlString, function(err, rows) {

                dbf.handleDBError(err,callback);
                total_finished_tins = rows[0].total_finished_tins;
                total_finished_grams = rows[0].total_finished_grams;
                total_finished_tin_acquire_cost = rows[0].total_finished_tin_acquire_cost;
                avg_grams_bowl = total_finished_grams / total_bowls;

                var startDate = new Date(smoke_start_date);
                var today = new Date();
                var weeksSmoking = Math.round(today-startDate)/604800000;
                avg_bowls_week = total_bowls / weeksSmoking;

                sqlString = 'SELECT sum(pipe.acquire_cost) AS total_pipe_acquire_costs, sum(pipe.sale_price) AS total_pipe_sale_prices from pipe;';

                connection.query(sqlString, function(err, rows) {

                    dbf.handleDBError(err,callback);
                    total_pipe_acquire_costs = rows[0].total_pipe_acquire_costs;
                    total_pipe_sale_prices = rows[0].total_pipe_sale_prices;
                    avg_cost_smoke_sans_cellar = (total_finished_tin_acquire_cost + total_pipe_acquire_costs - total_pipe_sale_prices) / total_bowls;

                    sqlString = 'SELECT sum(tin.acquire_cost) AS total_tin_acquire_cost from tin;';

                    connection.query(sqlString, function(err, rows) {

                        dbf.handleDBError(err,callback);
                        total_tin_acquire_cost = rows[0].total_tin_acquire_cost;
                        avg_cost_smoke_with_cellar = (total_tin_acquire_cost + total_pipe_acquire_costs - total_pipe_sale_prices) / total_bowls;

                        var sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

                        sqlString = 'SELECT count(smoke.id) AS total_last_six_months FROM smoke WHERE smoke.smoke_date > '+connection.escape(sixMonthsAgo.toISOString())+';';

                        connection.query(sqlString, function(err, rows) {

                            dbf.handleDBError(err,callback);
                            avg_bowls_week_last_six_months = rows[0].total_last_six_months / 26.0715;

                            sqlString = 'SELECT tin.grams, blend.style FROM tin, blend '+
                                        'WHERE tin.blend=blend.id AND tin.finish_date IS NOT NULL AND tin.finish_date > CAST(\'0001-01-01\' AS DATE);';

                            connection.query(sqlString, function(err, rows) {

                                dbf.handleDBError(err,callback);
                                var styleTotals = gst.getStyleTotals(rows);
                                results.styleTotals = styleTotals;
                                results.total_bowls = total_bowls;
                                results.total_finished_tins = total_finished_tins;
                                results.total_finished_grams = total_finished_grams;
                                results.total_finished_tin_acquire_cost = total_finished_tin_acquire_cost.toFixed(2);
                                results.avg_grams_bowl = avg_grams_bowl.toFixed(2);
                                results.avg_bowls_week = avg_bowls_week.toFixed(2);
                                results.avg_cost_smoke_sans_cellar = avg_cost_smoke_sans_cellar.toFixed(2);
                                results.avg_cost_smoke_with_cellar = avg_cost_smoke_with_cellar.toFixed(2);
                                results.smoke_start_date = smoke_start_date;
                                results.avg_bowls_week_last_six_months = avg_bowls_week_last_six_months.toFixed(2);

                                connection.end(dbf.handleDBErrorAndCallback(err,callback,results));
                            });
                        });
                    });
                });
            });
        });
    });
}

'use strict';

var mysql = require('mysql');
var dbf = require('./db_fxns');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var results = [];
        var sqlString = 'SELECT pipe.*, count(smoke.id) AS total_bowls, max(smoke.smoke_date) AS last_smoke_date '+
                        'FROM pipe '+
                        'LEFT JOIN (smoke) ON (pipe.id=smoke.pipe) ';
                        if (event.id) {
                            sqlString+='WHERE pipe.id='+connection.escape(event.id)+';';
                        } else if (event.onlyActive) {
                            sqlString+='WHERE pipe.active=true '+
                                       'GROUP BY pipe.id '+
                                       'ORDER BY last_smoke_date;';
                        } else {
                            sqlString+='GROUP BY pipe.id '+
                                       'ORDER BY pipe.active DESC, dedication, acquire_date;';
                        }

        connection.query(sqlString, function(err, rows) {

            dbf.handleDBError(err,callback);
            results = rows;
            var sqlString = 'SELECT pipe.id AS pipe, max(cleaning.clean_date) AS last_clean_date '+
                            'FROM pipe, cleaning '+
                            'WHERE pipe.id=cleaning.pipe '+
                            'GROUP BY pipe.id;';

            connection.query(sqlString, function(err, rows) {

                dbf.handleDBError(err,callback);
                for (var i=0; i<results.length; i++) {
                    for (var j=0; j<rows.length; j++) {
                        if (rows[j].pipe == results[i].id) {
                            results[i].last_clean_date = rows[j].last_clean_date;
                        }
                    }
                }
                var sqlString = 'SELECT p_sub.pipe, count(smoke.id) AS total_bowls_since_cleaned '+
                                'FROM (SELECT pipe.id AS pipe, max(cleaning.clean_date) AS last_clean_date '+
                                '      FROM pipe, cleaning '+
                                '      WHERE pipe.id=cleaning.pipe '+
                                '      GROUP BY pipe.id) p_sub, smoke '+
                                'WHERE p_sub.pipe = smoke.pipe AND p_sub.last_clean_date < smoke.smoke_date '+
                                'GROUP BY p_sub.pipe;';

                connection.query(sqlString, function(err, rows) {

                    dbf.handleDBError(err,callback);
                    for (var i=0; i<results.length; i++) {
                        for (var j=0; j<rows.length; j++) {
                            if (rows[j].pipe == results[i].id) {
                                results[i].total_bowls_since_cleaned = rows[j].total_bowls_since_cleaned;
                            }
                        }
                    }
                    sqlString = 'SELECT pipe, style AS most_smoked_style, max(style_count) AS most_smoked_style_count '+
                                'FROM (SELECT smoke.pipe, blend.style, count(smoke.id) AS style_count '+
                                '      FROM smoke, blend, tin '+
                                '      WHERE smoke.tin=tin.id AND tin.blend=blend.id '+
                                '      GROUP BY smoke.pipe, blend.style '+
                                '      ORDER BY style_count DESC) sub '+
                                'GROUP BY pipe;';

                    connection.query(sqlString, function(err, rows) {

                        dbf.handleDBError(err,callback);
                        for (var i=0; i<results.length; i++) {
                            for (var j=0; j<rows.length; j++) {
                                if (rows[j].pipe == results[i].id) {
                                    results[i].most_smoked_style = rows[j].most_smoked_style;
                                    results[i].most_smoked_style_count = rows[j].most_smoked_style_count;
                                }
                            }
                        }
                        sqlString = 'SELECT pipe, name AS most_smoked_blend, max(blend_count) AS most_smoked_blend_count '+
                                    'FROM (SELECT smoke.pipe, blend.name, count(smoke.id) AS blend_count '+
                                    '      FROM smoke, blend, tin '+
                                    '      WHERE smoke.tin=tin.id AND tin.blend=blend.id '+
                                    '      GROUP BY smoke.pipe, blend.name '+
                                    '      ORDER BY blend_count DESC) sub '+
                                    'GROUP BY pipe;';

                        connection.query(sqlString, function(err, rows) {

                            dbf.handleDBError(err,callback);
                            for (var i=0; i<results.length; i++) {
                                for (var j=0; j<rows.length; j++) {
                                    if (rows[j].pipe == results[i].id) {
                                        results[i].most_smoked_blend = rows[j].most_smoked_blend;
                                        results[i].most_smoked_blend_count = rows[j].most_smoked_blend_count;
                                    }
                                }
                            }
                            sqlString = 'SELECT pipe, name AS last_smoked_blend '+
                                        'FROM (SELECT smoke.pipe, max(smoke.smoke_date), blend.name '+
                                        '      FROM smoke, blend, tin '+
                                        '      WHERE smoke.tin=tin.id AND tin.blend=blend.id '+
                                        '      GROUP BY smoke.pipe, blend.name '+
                                        '      ORDER BY smoke.smoke_date DESC) sub '+
                                        'GROUP BY pipe;';

                            connection.query(sqlString, function(err, rows) {

                                dbf.handleDBError(err,callback);
                                for (var i=0; i<results.length; i++) {
                                    for (var j=0; j<rows.length; j++) {
                                        if (rows[j].pipe == results[i].id) {
                                            results[i].last_smoked_blend = rows[j].last_smoked_blend;
                                        }
                                    }
                                }
                                for (var i=0; i<results.length; i++) {
                                    if (!results[i].last_clean_date) {
                                        results[i].total_bowls_since_cleaned = results[i].total_bowls;
                                    }

                                    if (results[i].last_smoke_date && results[i].last_smoke_date!='') {
                                        var lastSmokeDate = new Date(results[i].last_smoke_date);
                                        var today = new Date();
                                        results[i].days_rest = Math.floor((today-lastSmokeDate)/8.64e+7);
                                    }

                                    var acquireCostPerSmoke;
                                    if (results[i].acquire_cost && results[i].total_bowls) {
                                        acquireCostPerSmoke = results[i].acquire_cost / results[i].total_bowls;
                                    } else {
                                       acquireCostPerSmoke=0.00;
                                    }
                                    results[i].acquire_cost_per_smoke = acquireCostPerSmoke.toFixed(2);
                                }

                                if (event.bsc) {
                                    var bscArray = [];
                                    for (var i=0; i<results.length; i++) {
                                        if (results[i].total_bowls_since_cleaned > event.bsc) {
                                            bscArray.push(results[i]);
                                        }
                                    }
                                    results=bscArray;
                                }
                                connection.end(dbf.handleDBErrorAndCallback(err,callback,results));
                            });
                        });
                    });
                });
            });
        });
    });
}

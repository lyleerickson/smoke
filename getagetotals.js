'use strict';

function getAgeTotals(rows) {

    var ageTotals = [
        {"age": "0-0.5","grams": 0,"tins": 0},
        {"age": "0.5-1","grams": 0,"tins": 0},
        {"age": "1-1.5","grams": 0,"tins": 0},
        {"age": "1.5-2","grams": 0,"tins": 0},
        {"age": "2-2.5","grams": 0,"tins": 0},
        {"age": "2.5-3","grams": 0,"tins": 0},
        {"age": "3-3.5","grams": 0,"tins": 0},
        {"age": "3.5-4","grams": 0,"tins": 0},
        {"age": "4-4.5","grams": 0,"tins": 0},
        {"age": "4.5-5","grams": 0,"tins": 0},
        {"age": "5-5.5","grams": 0,"tins": 0},
        {"age": "5.5-6","grams": 0,"tins": 0},
        {"age": "6-6.5","grams": 0,"tins": 0},
        {"age": "6.5-7","grams": 0,"tins": 0},
        {"age": "7-7.5","grams": 0,"tins": 0},
        {"age": "7.5-8","grams": 0,"tins": 0},
        {"age": "8-8.5","grams": 0,"tins": 0},
        {"age": "8.5-9","grams": 0,"tins": 0},
        {"age": "9-9.5","grams": 0,"tins": 0},
        {"age": "9.5-10","grams": 0,"tins": 0},
        {"age": "10+","grams": 0,"tins": 0}
    ];
    var today = new Date();
    var sixMonthsInMS = 1.577e+10;

    for (var i=0; i<rows.length; i++) {
        var start_date;
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
        var ageInMS = today-start_date;

        for (var j=0;j<ageTotals.length;j++) {
            if  (ageInMS < (j+1)*sixMonthsInMS) {
               ageTotals[j].grams+=rows[i].grams;
               ageTotals[j].tins++;
               j=99999;
            }
            if  (j==(ageTotals.length-1)) {
                ageTotals[(ageTotals.length-1)].grams+=rows[i].grams;
                ageTotals[(ageTotals.length-1)].tins++;
            }
        }
    }
    return ageTotals;
}

module.exports.getAgeTotals = getAgeTotals;

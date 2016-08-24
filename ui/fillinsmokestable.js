"use strict"

function fillInSmokesTable(pipefilter, blendfilter, tinfilter, limitResults) {
    var XHR = new XMLHttpRequest();

    XHR.addEventListener('load', function(event) {
        $("#smokesTable tbody tr").remove();

        var smokesJSON = JSON.parse(XHR.responseText);

        for(var i = 0; i < smokesJSON.length; i++) {
            var smokeJSON = smokesJSON[i];
            var table = document.getElementById('smokesTable').getElementsByTagName('tbody')[0];
            var row = table.insertRow();
            var cell = row.insertCell(0);
            var text;
            var link = document.createElement('a');
            if (smokeJSON.smoke_date && smokeJSON.smoke_date.substring(0,1)!="0") {
                text  = document.createTextNode(smokeJSON.smoke_date.substring(0, 10));
                link.appendChild(text);
                link.title = smokeJSON.smoke_date.substring(0, 10);
                link.href = "smoke.html?id="+smokeJSON.id;
            } else {
                text  = document.createTextNode(smokeJSON.id);
                link.appendChild(text);
                link.title = smokeJSON.id;
                link.href = "smoke.html?id="+smokeJSON.id;
            }

            cell.appendChild(link);
            cell  = row.insertCell(1);
            if (smokeJSON.location) {
                text  = document.createTextNode(smokeJSON.location);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(2);
            if (smokeJSON.pipe_name) {
                text  = document.createTextNode(smokeJSON.pipe_name);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(3);
            if (smokeJSON.blend_name) {
                text  = document.createTextNode(smokeJSON.blend_name);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(4);
            if (smokeJSON.tin_note) {
                text  = document.createTextNode(smokeJSON.tin_note);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(5);
            if (smokeJSON.packing_note) {
                text  = document.createTextNode(smokeJSON.packing_note);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(6);
            if (smokeJSON.smoking_note) {
                text  = document.createTextNode(smokeJSON.smoking_note);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);

            cell  = row.insertCell(7);
            if (smokeJSON.finish_note) {
                text  = document.createTextNode(smokeJSON.finish_note);
            } else {
                text  = document.createTextNode("");
            }
            cell.appendChild(text);
        }
    });

    XHR.addEventListener('error', function(event) {
        var table = document.getElementById('cleaningsTable');
        var row   = table.insertRow();
        var cell  = row.insertCell(0);
        var text  = document.createTextNode('error loading table');
        cell.appendChild(text);
    });
    if (pipefilter) {
        XHR.open('GET', 'https://4yxq7qw9u0.execute-api.us-west-2.amazonaws.com/beta/smokes?pipeID='+pipefilter, true);
    } else if (blendfilter) {
        XHR.open('GET', 'https://4yxq7qw9u0.execute-api.us-west-2.amazonaws.com/beta/smokes?blendID='+blendfilter, true);
    } else if (tinfilter) {
        XHR.open('GET', 'https://4yxq7qw9u0.execute-api.us-west-2.amazonaws.com/beta/smokes?tinID='+tinfilter, true);
    } else if (limitResults) {
        XHR.open('GET', 'https://4yxq7qw9u0.execute-api.us-west-2.amazonaws.com/beta/smokes?limitResults='+limitResults, true);
    } else {
        XHR.open('GET', 'https://4yxq7qw9u0.execute-api.us-west-2.amazonaws.com/beta/smokes', true);
    }
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.setRequestHeader("x-api-key", "T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5");
    XHR.send();
}
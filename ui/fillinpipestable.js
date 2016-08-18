"use strict"

function fillInPipesTable(includeOnlyActive, bowlsSinceCleaned) {
    var XHR = new XMLHttpRequest();

    XHR.addEventListener('load', function(event) {
        $("#pipesTable tbody tr").remove();

        var pipesJSON = JSON.parse(XHR.responseText);

        for(var i = 0; i < pipesJSON.length; i++) {
            var pipeJSON = pipesJSON[i];
            var table = document.getElementById('pipesTable').getElementsByTagName('tbody')[0];
            var row = table.insertRow();
            var cell = row.insertCell(0);
            var text;
            var link = document.createElement('a');
            if (pipeJSON.name) {
                text  = document.createTextNode(pipeJSON.name);
                link.title = pipeJSON.name;
            } else {
                text  = document.createTextNode(pipeJSON.id);
                link.href = "pipe.html?id="+pipeJSON.id;
            }
            link.appendChild(text);
            link.href = "pipe.html?id="+pipeJSON.id;
            if (pipeJSON.days_rest && pipeJSON.days_rest < 7) {
                link.setAttribute("STYLE","color:gray");
            }
            cell.appendChild(link);
            cell  = row.insertCell(1);
            text  = document.createTextNode(formatTextForTable(pipeJSON.days_rest));
            cell.appendChild(text);
            cell  = row.insertCell(2);
            text  = document.createTextNode(pipeJSON.total_bowls);
            cell.appendChild(text);
            cell  = row.insertCell(3);
            text  = document.createTextNode(formatTextForTable(pipeJSON.last_smoke_date,10,false));
            cell.appendChild(text);
            cell  = row.insertCell(4);
            text  = document.createTextNode(formatTextForTable(pipeJSON.total_bowls_since_cleaned));
            cell.appendChild(text);
            cell  = row.insertCell(5);
            text  = document.createTextNode(formatTextForTable(pipeJSON.dedication,24,true));
            cell.appendChild(text);
            cell  = row.insertCell(6);
            text  = document.createTextNode(formatTextForTable(pipeJSON.last_smoked_blend));
            cell.appendChild(text);
            cell  = row.insertCell(7);
            text  = document.createTextNode(formatTextForTable(pipeJSON.most_smoked_style+' ('+pipeJSON.most_smoked_style_count+') / '+pipeJSON.most_smoked_blend+' ('+pipeJSON.most_smoked_blend_count+')',65, true));
            cell.appendChild(text);
        }
    });

    XHR.addEventListener('error', function(event) {
        var table = document.getElementById('pipesTable');
        var row   = table.insertRow();
        var cell  = row.insertCell(0);
        var text  = document.createTextNode('error loading table');
        cell.appendChild(text);
    });

    if (includeOnlyActive) {
        XHR.open('GET', 'https://f5ssi7ej95.execute-api.us-west-2.amazonaws.com/beta/pipes?onlyActive=y', true);
    } else if (bowlsSinceCleaned) {
        XHR.open('GET', 'https://f5ssi7ej95.execute-api.us-west-2.amazonaws.com/beta/pipes?bowlsSinceCleaned='+bowlsSinceCleaned, true);
    } else {
        XHR.open('GET', 'https://f5ssi7ej95.execute-api.us-west-2.amazonaws.com/beta/pipes', true);
    }
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send();
}
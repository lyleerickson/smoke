"use strict"
function fillInPipeSelector(pipeToSelect, includeOnlyInRotation) {
    var XHR = new XMLHttpRequest();

    XHR.addEventListener('load', function(event) {

//        $("#pipeSelector option[value='loading']").remove();
        $("#pipeSelector").empty();

        var pipesJSON = JSON.parse(XHR.responseText);

        $("#pipeSelector").append('<option value="blank"> </option>');

        for(var i = 0; i < pipesJSON.length; i++) {
            var pipeJSON = pipesJSON[i];
            if (includeOnlyInRotation && pipeJSON.active) {
                $("#pipeSelector").append('<option value="'+pipeJSON.id+'">'+pipeJSON.name+'</option>');
            } else if (!includeOnlyInRotation) {
                $("#pipeSelector").append('<option value="'+pipeJSON.id+'">'+pipeJSON.name+'</option>');
            }
        }

        var optionsArray = $("#pipeSelector option");

        optionsArray.sort(function(a,b) {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0
        })

        $("#pipeSelector").empty().append( optionsArray );
        $("#pipeSelector").val(pipeToSelect);
    });

    XHR.addEventListener('error', function(event) {
        $("#pipe option[value='loading']").remove();
        $("#pipe").append('<option value="">error loading pipes...</option>');
    });

    XHR.open('GET', 'https://f5ssi7ej95.execute-api.us-west-2.amazonaws.com/beta/pipes', true);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.setRequestHeader("x-api-key", "T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5");
    XHR.send();
}
"use strict"
function fillInTinSelector(tinToSelect, includeOnlyOpenTins) {

    var XHR = new XMLHttpRequest();
    var urlString = "https://vyvrxxzwi9.execute-api.us-west-2.amazonaws.com/beta/tins";
    if (includeOnlyOpenTins) {
        urlString = "https://vyvrxxzwi9.execute-api.us-west-2.amazonaws.com/beta/tins?onlyOpen=true"
    }

    XHR.addEventListener('load', function(event) {

        var tinsJSON = JSON.parse(XHR.responseText);
        $("#tinSelector").empty();
        $("#tinSelector").append('<option value="blank"> </option>');
        for(var i = 0; i < tinsJSON.length; i++) {
            var tinJSON = tinsJSON[i];
            $("#tinSelector").append('<option value="'+tinJSON.id+'">'+tinJSON.maker+': '+tinJSON.name+'</option>');
        }
        var optionsArray = $("#tinSelector option");

        optionsArray.sort(function(a,b) {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0
        })
        $("#tinSelector").empty().append( optionsArray );
        $("#tinSelector").val(tinToSelect);
    });

    XHR.addEventListener('error', function(event) {
        $("#blend option[value='loading']").remove();
        $("#blend").append('<option value="">error loading tins...</option>');
    });


    XHR.open('GET', urlString, true);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.setRequestHeader("x-api-key", "T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5");
    XHR.send();
}
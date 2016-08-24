"use strict"
function fillInBlendSelector(blendToSelect) {
    var XHR = new XMLHttpRequest();

    XHR.addEventListener('load', function(event) {

        $("#blendSelector").empty();

        var blendsJSON = JSON.parse(XHR.responseText);

        $("#blendSelector").append('<option value="blank"> </option>');

        for(var i = 0; i < blendsJSON.length; i++) {
            var blendJSON = blendsJSON[i];
            $("#blendSelector").append('<option value="'+blendJSON.id+'">'+blendJSON.maker+': '+blendJSON.name+'</option>');
        }

        var optionsArray = $("#blendSelector option");

        optionsArray.sort(function(a,b) {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0
        })

        $("#blendSelector").empty().append( optionsArray );
        $("#blendSelector").val(blendToSelect);
    });

    XHR.addEventListener('error', function(event) {
        $("#blend option[value='loading']").remove();
        $("#blend").append('<option value="">error loading blends...</option>');
    });

    XHR.open('GET', 'https://vyvrxxzwi9.execute-api.us-west-2.amazonaws.com/beta/blends', true);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.setRequestHeader("x-api-key", "T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5");
    XHR.send();
}
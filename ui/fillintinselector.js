"use strict"
function fillInTinSelector(tinToSelect, includeOnlyOpenTins) {

    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', function(event) {
        $("#tinSelector").empty();

        var tinsJSON = JSON.parse(XHR.responseText);

        $("#tinSelector").append('<option value="blank"> </option>');

        for(var i = 0; i < tinsJSON.length; i++) {
            var tinJSON = tinsJSON[i];
            if (includeOnlyOpenTins && tinJSON.open_date && tinJSON.open_date!='' && tinJSON.open_date.substring(0, 4)!='0000') {
                $("#tinSelector").append('<option value="'+tinJSON.id+'">'+tinJSON.maker+': '+tinJSON.name+'</option>');
            } else if (!includeOnlyOpenTins) {
                $("#tinSelector").append('<option value="'+tinJSON.id+'">'+tinJSON.maker+': '+tinJSON.name+'</option>');
            }
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

    XHR.open('GET', 'https://vyvrxxzwi9.execute-api.us-west-2.amazonaws.com/beta/tins', true);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send();
}
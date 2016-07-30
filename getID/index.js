'use strict';

exports.handler = (event, context, callback) => {

    var id = {
        "id": new Date().toISOString()
    };

    var id2 = new Date().toISOString();

    callback(null,id);
}

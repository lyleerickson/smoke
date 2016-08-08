'use strict';

exports.handler = (event, context, callback) => {

    var id = {
        "id": new Date().toISOString()
    };

    callback(null,id);
}

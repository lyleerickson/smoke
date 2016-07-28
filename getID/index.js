'use strict';

exports.handler = (event, context, callback) => {

    var id = new Date().toISOString();

    callback(null,id);
}

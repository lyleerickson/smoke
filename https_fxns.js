'use strict';

function getHTTPSOptions() {

    var httpsOptions = {
        hostname: 'u9f57ctlmf.execute-api.us-west-2.amazonaws.com',
        port: 443,
        path: '/beta/id',
        headers: {
            'x-api-key': 'T7rjybCXgkaRhDky3Stks7YjelXvwOamYkEUgWN5'
        }
    };

    return httpsOptions;
}

module.exports.getHTTPSOptions = getHTTPSOptions;
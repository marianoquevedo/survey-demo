'use strict';

// Load modules
const Massive = require('massive');

exports.plugin = {
    register: async (server, options) => {

        const massiveInstance = await Massive(options.pg);
        server.decorate('server', 'db', massiveInstance);
    },
    name: 'db'
};

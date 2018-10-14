'use strict';

// Load modules
const Massive = require('massive');
const DatabaseConfig = require('../../../config/database.json');

exports.plugin = {
    register: async (server, options) => {

        const massiveInstance = await Massive(DatabaseConfig.local);
        server.decorate('server', 'db', massiveInstance);
    },
    name: 'db'
};

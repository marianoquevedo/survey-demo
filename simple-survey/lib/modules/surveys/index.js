'use strict';

// Load modules
const Routes = require('./routes');
const Handlers = require('./handlers');

exports.plugin = {
    register: (server, options) => {

        const db = server.db;

        const handlers = new Handlers(db);
        server.route(Routes(handlers));
    },
    name: 'surveys'
};

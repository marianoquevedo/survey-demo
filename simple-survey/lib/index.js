'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    port: process.env.PORT
});

// Start the server
async function start() {

    try {

        // register plugins
        await server.register({
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: true,
                logEvents: ['response']
            }
        });

        await server.register({
            plugin: require('./modules/db'),
            options: {
                pg: {
                    host: process.env.POSTGRES_HOST,
                    port: process.env.POSTGRES_PORT,
                    database: process.env.POSTGRES_DB,
                    user: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    schema: 'public'
                }
            }
        });
        await server.register(require('./modules/surveys'));

        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();
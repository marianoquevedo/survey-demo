'use strict';

//const Schema = require('./schema');

module.exports = (handlers) => [
    {
        method: 'GET',
        path: '/surveys',
        config: {
            handler: async (request, h) => {

                return handlers.getSurveys(request, h);
            }
        }
    },
    {
        method: 'POST',
        path: '/surveys',
        config: {
            handler: async (request, h) => {

                return handlers.createSurvey(request, h);
            }
        }
    }
];


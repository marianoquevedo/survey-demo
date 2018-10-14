'use strict';

const Schema = require('./schema');

module.exports = (handlers) => [
    {
        method: 'GET',
        path: '/surveys',
        config: {
            handler: async (request, h) => {

                return handlers.getSurveys(request, h);
            },
            response: {
                schema: Schema.outputs.getSurveys,
                modify: true,
                options: {
                    stripUnknown: true
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/surveys',
        config: {
            validate: {
                payload: Schema.inputs.createSurveys
            },
            handler: async (request, h) => {
                
                return handlers.createSurvey(request, h);
            },
            response: {
                schema: Schema.outputs.createSurvey,
                modify: true,
                options: {
                    stripUnknown: true
                }
            }
        }
    }
];


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
    },
    {
        method: 'POST',
        path: '/surveys/{id}/response',
        config: {
            validate: {
                payload: Schema.inputs.respondSurvey
            },
            handler: async (request, h) => {
                
                return handlers.respondSurvey(request, h);
            },
            response: {
                schema: Schema.outputs.respondSurvey,
                modify: true,
                options: {
                    stripUnknown: true
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/surveys/export',
        config: {
            handler: async (request, h) => {

                return handlers.exportSurveys(request, h);
            },
            response: {
                schema: Schema.outputs.export,
                modify: true,
                options: {
                    stripUnknown: true
                }
            }
        }
    },
];


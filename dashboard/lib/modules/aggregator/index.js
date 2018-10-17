'use strict';

// Load modules
const Axios = require('axios');
const Aggregator = require('./aggregator');
const SurveyClient = require('./surveyClient');

exports.plugin = {
    register: (server, options) => {

        const db = server.db;
        const surveyClient = SurveyClient(options, Axios)

        const aggregator = Aggregator(db, surveyClient);
        aggregator.start();
    },
    name: 'surveys'
};

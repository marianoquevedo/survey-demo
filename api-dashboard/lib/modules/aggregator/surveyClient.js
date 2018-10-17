'use strict';

module.exports = (config, axios) => {

    this.axios = axios;
    this.config = config;

    const getSurveys = () => {

        const url = `${config.simpleSurveyUrl}/surveys/export`;
        return this.axios.get(url);
    }

    return {
        getSurveys
    }
}

'use strict';

module.exports = (intervalSeconds, db, surveyClient) => {

    this.db = db;
    this.surveyClient = surveyClient;
    this.interval = 1000 * intervalSeconds;

    const start = () => {

        setInterval(aggregate, this.interval)
    }

    const aggregate = async () => {

        console.log('running aggregator');

        const simpleSurveys = await getData();
        const surveyPromises = simpleSurveys.map((s) => {

            return this.db.simple_survey.insert({
                simple_survey_id: s.id,
                payload: s
            }, {
                onConflictIgnore: true
            });
        });
        
        await Promise.all(surveyPromises);
        console.log(`aggregator finished - processed ${simpleSurveys.length} records`);

        return;
    }

    const getData = async () => {

        const response = await this.surveyClient.getSurveys();
        return response.data
    }

    return {
        start
    }
}

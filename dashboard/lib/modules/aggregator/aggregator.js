'use strict';

const internals = {
    INTERVAL_SECONDS: 1000 * 1 
}

module.exports = (db, surveyClient) => {

    this.db = db;
    this.surveyClient = surveyClient;

    const start = () => {
        setInterval(aggregate, internals.INTERVAL_SECONDS)
    }

    const aggregate = async () => {

        // call the simple survey service to get the data
        const simpleSurveys = await getData();

        // save the data to the DB
        const surveyPromises = simpleSurveys.map((s) => {
            return this.db.simple_survey.insert({
                simple_survey_id: s.id,
                title: s.title,
                description: s.description
            }).then(() => {

                const questionsPromises = s.questions.map((q) => {
                    return this.db.simple_question.insert({
                        simple_survey_id: s.id,
                        simple_question_id: q.id,
                        text: q.text
                    })
                });

                return Promise.all(questionsPromises);
            });
        });

        return await Promise.all(surveyPromises);
    }

    const getData = async () => {

        const response = await this.surveyClient.getSurveys();
        return response.data
    }

    return {
        start
    }
}

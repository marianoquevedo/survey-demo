'use strict';

const internals = {
    SURVEY_LIMIT: 15
}

module.exports = (db) => {

    this.db = db;

    const getSurveys = async (request, h) => {

        const surveys = await this.db.survey.find({}, { order: "id desc", limit: internals.SURVEY_LIMIT });

        const surveysWithQuestionsPromises = surveys.map((s) => {
            return this.db.question.find({ survey_id: s.id }, { fields: ['id', 'text']}).then((questions) => {
                s.questions = questions;
                return s;
            });
        });

        return await Promise.all(surveysWithQuestionsPromises);
    };

    const createSurvey = async (request, h) => {

        const payload = request.payload;

        const newSurvey =  await this.db.survey.insert({
            title: payload.title,
            description: payload.description
        });

        const questionsPromises = payload.questions.map((q) => {
            return this.db.question.insert({
                survey_id: newSurvey.id,
                text: q.text
            });
        });

        newSurvey.questions = await Promise.all(questionsPromises);
        return h.response(newSurvey).code(201);
    }

    const respondSurvey = async (request, h) => {

        const payload = request.payload;
        const surveyId = request.params.id;

        const newResponse =  await this.db.survey_response.insert({
            survey_id: surveyId,
            country: payload.country
        });

        const responsesPromises = payload.responses.map((r) => {
            return this.db.question_response.insert({
                survey_response_id: newResponse.id,
                question_id: r.questionId,
                text: r.text
            });
        });

        newResponse.responses = await Promise.all(responsesPromises);
        return h.response(newResponse).code(201);
    }

    const exportSurveys = async (request, h) => {

        const surveyResponses = await this.db.survey_response.find({});
        
        const surveysWithResponsesPromises = surveyResponses.map((s) => {
            return this.db.question_response.find({ survey_response_id: s.id }).then((responses) => {
                s.responses = responses;
                return s;
            });
        });

        return await Promise.all(surveysWithResponsesPromises);
    };

    return {
        getSurveys,
        createSurvey,
        respondSurvey,
        exportSurveys
    }
}

'use strict';

class Handlers {

    constructor(db) {

        this.db = db;
        this.SURVEY_LIMIT = 15;
    }

    async getSurveys(request, h) {

        const surveys = await this.db.survey.find({}, { limit: this.SURVEY_LIMIT });

        const surveysWithQuestionsPromises = surveys.map((s) => {
            return this.db.question.find({ survey_id: s.id }, { fields: ['id', 'text']}).then((questions) => {
                s.questions = questions;
                return s;
            });
        });

        return await Promise.all(surveysWithQuestionsPromises);
    }

    async createSurvey(request, h) {

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
}

module.exports = Handlers;

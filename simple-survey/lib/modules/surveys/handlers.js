'use strict';

class Handlers {


    constructor(db) {

        this.db = db;
    }

    async getSurveys(request, h) {

        const surveys = await this.db.survey.find();
        return surveys;
    }

    createSurvey(request, h) {

        

        return h.response().code(201);
    }
}

module.exports = Handlers;

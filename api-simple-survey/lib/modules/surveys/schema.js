'use strict';

const Joi = require('joi');

const internals = {};

internals.question = Joi.object({
    text: Joi.string().max(150)
});

internals.survey = Joi.object({
    title: Joi.string().max(50),
    description: Joi.string().max(250)
});

internals.response = Joi.object({
    questionId: Joi.number(),
    text: Joi.string().max(250)
});

exports.inputs = {
    createSurvey: internals.survey.keys({
        questions: Joi.array().items(internals.question)
    }),
    respondSurvey: Joi.object({
        country: Joi.string().max(80),
        responses: Joi.array().items(internals.response)
    })
};

exports.outputs = {
    getSurveys: Joi.array().items(internals.survey.keys({
        id: Joi.number(),
        questions: Joi.array().items(internals.question.keys({ id: Joi.number() }))
    })),
    createSurvey: internals.survey.keys({
        id: Joi.number(),
        questions: Joi.array().items(internals.question.keys({ id: Joi.number() }))
    }),
    respondSurvey: Joi.object({
        id: Joi.number(),
        country: Joi.string().max(80),
        responses: Joi.array().items(internals.response.keys({ id: Joi.number() }))
    }),
    export: Joi.array().items(Joi.object({
        id: Joi.number(),
        country: Joi.string().max(80),
        responses: Joi.array().items(internals.response.keys({ 
            id: Joi.number(),
            question_id: Joi.number()
        }))
    }))
};

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


exports.inputs = {
    createSurvey: internals.survey.keys({
        questions: Joi.array().items(internals.question)
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
    })
};

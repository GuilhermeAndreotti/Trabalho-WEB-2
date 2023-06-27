const Joi = require('joi');

const treinoSchema = Joi.object({
    data: Joi.string().pattern(/^(202[3-9]|20[3-9][0-9])-([0][1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/).required(), 
});

module.exports = { treinoSchema };
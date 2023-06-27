const Joi = require('joi');

const UsuarioSchema = Joi.object({
  email: Joi.string().pattern(/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/).required(),
  idade: Joi.number().integer().min(18).max(89).required(),
  senha: Joi.string().required()
});

module.exports = { UsuarioSchema };
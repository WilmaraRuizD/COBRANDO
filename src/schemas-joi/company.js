const Joi = require('joi')

 const departamentoShema=Joi.object({
    nombre:Joi.string().min(1).max(100).required(),
    presupuesto:Joi.number().required()
    
})

 const empleadosShema=Joi.object({

nit:Joi.string().min(1).max(9).required(),
nombre:Joi.string().min(1).max(100).required(),
apellido1:Joi.string().min(1).max(100).required(),
apellido2:Joi.string().min(1).max(100).required(),
fk_departamento :Joi.number().required()

    }
)

module.exports = {departamentoShema,empleadosShema}
const Joi=require("joi");

const postValidation=Joi.object({
    title:Joi.string().min(3).max(20).required(),
    body:Joi.string().min(5).max(100).required(),
    price:Joi.number().min(2).max(100).required(),
    tag:Joi.string().required()
})

module.exports={postValidation}
const Joi = require('@hapi/joi');

const postRecipeValidation = (recipe) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        time: Joi.string().required(),
        portions: Joi.number().required(),
        ingredients: Joi.required(),
        instructions: Joi.string().required(),
        image: Joi.required(),
        userId: Joi.string()
    }).options({ abortEarly: false });
    return JoiSchema.validate(recipe);
}

const signupValidation = (user) => {
    const JoiSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        avatar: Joi.string()
    }).options({ abortEarly: false })
    return JoiSchema.validate(user)
}

const loginValidation = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(11).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(user);
}

module.exports = {
    postRecipeValidation,
    signupValidation,
    loginValidation
}
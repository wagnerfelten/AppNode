const AppError = require("../utils/appError");

class USersController{
    create(req, res){
        const { name, email, password } = req.body;

        if(!name){
            throw new AppError("Nome é obrigatorio")
        }

        res.status(201).json({name, email, password});
    }
}

module.exports = USersController;
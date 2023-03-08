const {Router} = require("express");

const USersController = require("../Controller/UserController");

const usersRoutes = Router();

function myMiddlewere(req, res, next){
    console.log("You passed Middlewere!!");

    if(!req.body.userAdmin){
        return res.json({message: "User not autorized!!"})
    }

    next();
};

const usersController = new USersController();

usersRoutes.post("/", myMiddlewere, usersController.create);

module.exports = usersRoutes;
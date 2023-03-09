const AppError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite");
class USersController{
    async create(req, res){
        const { name, email, password } = req.body;

        const database = await sqliteConnection();
        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
       
        if(checkUsersExists){
            throw new AppError("Este email já existe.");
        }

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        return res.status(201).json("Criado com sucesso!!!");
    }
}

module.exports = USersController;
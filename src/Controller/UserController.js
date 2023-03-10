const {hash , compare} = require("bcryptjs");
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

        const hashPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashPassword]);

        return res.status(201).json("Criado com sucesso!!!");
    }

    async update(req, res){
        const {name, email, password, old_password } = req.body;
        const { id } = req.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Este usúario não existe!");
        }

        const userUpadeteEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userUpadeteEmail && userUpadeteEmail.id !== user.id){
            throw new AppError("Este email já esta em uso.");
        }

        user.name = name;
        user.email = email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a nova senha!")
        }

        if(password == old_password){
            throw new AppError("As senha não podem ser iguais.")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME("now")
            WHERE id = ?
        `,[user.name, user.email, user.password, id]
        );

        return res.status(200).json("Alterado com sucesso!")
    }
}

module.exports = USersController; 
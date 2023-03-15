const { response } = require("express");
const knex = require("../database/knex");

class MovieControllers{
    async create(req, res){
        const {title, description, rating, movieTags} = req.body;
        const { user_id } = req.params;
    
    
        const note_id = await knex("movieNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTagsInsert = movieTags.map(name => {
            note_id,
            name,
            user_id
        })

        await knex("movieTags").insert(movieTagsInsert);
    
        res.status(200).json();
    }

    async show(req, res){
        const {id} = req.params;

        const movieNote = await knex("movieNotes").where({id}).first();
        const movieTags = await knex("movieTags").where({note_id: id}).orderBy("name");

        return res.json({
            ...movieNote,
            movieTags
        });
    }

    async delete(req, res){
        const { id} = req.params

        await knex("movieNotes").where({id}).delete();

        return res.json("Deletado nota.")
    }

    async index(req, res){
        const {user_id} = req.query;

        const movieNote = await knex("movieNotes")
            .where({user_id})
            .orderBy("title");

        return res.json(movieNote);
    }
}

module.exports = MovieControllers;
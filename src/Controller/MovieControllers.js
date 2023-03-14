const knex = require("../database/knex");

class MovieControllers{
    async create(req, res){
        const {title, description, movieTags} = req.body;
        const { user_id } = req.params;
    
    
        const note_id = await knex("movieNotes").insert({
            title,
            description,
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

  
}

module.exports = MovieControllers;
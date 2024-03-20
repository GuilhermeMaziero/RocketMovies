const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const { hash, compare } = require('bcryptjs');

class UsersController {

    async create (request, response) {
        const {name, email, password} = request.body;

        const checkUserExists = await knex("users").where('email', email).then((rows) => {
            
            if (rows.length > 0) {
                return true;
            } else {
                return false;
            }
        });

        if (checkUserExists) {

            throw new AppError("Este e-mail já esta em uso.");
        }

        const hashedPassword =  await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password:hashedPassword

        });

        return response.status(201).json(); 
    }

    async update (request, response) {

        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const user = await knex("users").where({ id }).first();

        if (!user) {

            throw new AppError("Usuário não encontrado!");
        }

        user.name  = name ?? user.name;
        user.email = email ?? user.email;

        const userWithUpdatedEmail = await knex("users").where("email", user.email).first();

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já esta em uso!");
        }

        if ( password && !old_password) {

            throw new AppError("Necessário informar a senha antiga para definir a nova senha!");
        }

        if ( password && old_password) {

            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {

                throw new AppError("A senha antiga não confere!");
            }

            user.password = await hash(password,8);
        }

        await knex("users").where({id}).update(user);

        return response.json();
    }
}

module.exports = UsersController;
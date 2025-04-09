import database from "../models/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ERROR_MESSAGES = {
    USER_EXISTS: "Usuario já existe",
    REQUIRED_FIELDS: "Todos os campos são obrigatórios",
    USER_NOT_FOUND: "Usuario não encontrado",
    INVALID_PASSWORD: "Senha inválida",
    INVALID_EMAIL: "Email inválido",
    PASSWORD_TOO_SHORT: "Senha deve ter no mínimo 6 caracteres",
};

class UserService {
    async validateUserData(data) {
        if(!data.name || !data.email || !data.password) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
        }
        if(!data.email.includes('@')) {
            throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
        }
        if(data.password.length < 6) {
            throw new Error(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
        }
    }

    async createUser(data) {
        try {
            await this.validateUserData(data);
            
            const existingUser = await this.getUserByEmail(data.email);
            if (existingUser.length > 0) {
                throw new Error(ERROR_MESSAGES.USER_EXISTS);
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            const user = await database('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', 
                [data.name, data.email, hashedPassword]);
            return user[0];
        } catch (error) {
            throw error;
        }
    }
    
    async login(data) {
        try {
            const { email, password } = data;
        
            const result = await database('SELECT * FROM users WHERE email = $1', [email]);
        
            if (result.length === 0) {
                throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            }
            const user = result[0];
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
        
            if (!isPasswordValid) {
                throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
            }

            if (!process.env.SECRET_KEY) {
                throw new Error("SECRET_KEY não definida");
            }

            console.log('Generating token with SECRET_KEY:', process.env.SECRET_KEY);
            
            const tokenPayload = {
                id: user.id,
                email: user.email
            };
            
            const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
        
            return {
                accessToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        const result = await database('SELECT * FROM users WHERE email = $1', [email]);
        return result;
    }
}

export default UserService;
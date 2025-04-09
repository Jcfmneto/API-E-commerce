import UserService from "../services/UserService.js";

const userService = new UserService();

class UsersController{  
    static async createUser(req, res){
        const {name, email, password} = req.body;
        try{
            const user = await userService.createUser({name, email, password});
            return res.status(201).json({
                message: "Usuário criado com sucesso",
                user
            });
        }catch(error){
            return res.status(400).json({
                message: "Erro na criação do usuário",
                error: error.message
            });
        }
    }
    static async login(req, res){
         try{
            const {email, password} = req.body;
            const {accessToken, user} = await userService.login({email, password});
            
            res.cookie("token", accessToken, {
                httpOnly: true,
                maxAge: 3600000 
            });

            return res.status(200).json({
                message: "Login realizado com sucesso",
                accessToken,
                user
            });
         }catch(error){
            return res.status(400).json({
                message: "Erro no login",
                error: error.message
            });
         }
    }
    static async logout(req, res){
    res.clearCookie("token");
        return res.status(200).json({message: "Logout realizado com sucesso"});
    }
}

export default UsersController;

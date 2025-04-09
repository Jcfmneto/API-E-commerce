import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
    try {
        // Get token from cookie only
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        if (!process.env.SECRET_KEY) {
            console.error("Erro crítico: SECRET_KEY não definida");
            return res.status(500).json({ message: "Erro interno do servidor" });
        }

        try {
            // Use the exact same secret key that was used to generate the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (jwtError) {
            console.error('JWT Verification Error:', jwtError);
            return res.status(401).json({ 
                message: "Token inválido ou expirado",
                error: jwtError.message
            });
        }
    } catch (error) {
        console.error("Erro na verificação do token:", error);
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}

export default authMiddleware;

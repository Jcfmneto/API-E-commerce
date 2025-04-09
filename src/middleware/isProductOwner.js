import database from "../models/database.js";

async function isProductOwner(req, res, next) {
    const reqUserId = req.user.id;
    const productId = req.params.id;

    const product = await database('SELECT * FROM products WHERE id = $1 AND user_id = $2', [productId, reqUserId]);

    if(product.length === 0) {
        return res.status(403).json({message: "Você não tem permissão para acessar este produto"});
    }

    next();
}

export default isProductOwner;

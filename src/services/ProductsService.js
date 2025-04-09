import database from "../models/database.js";

const ERROR_MESSAGES = {
    INVALID_PRODUCT_DATA: "Dados do produto inválidos",
    PRODUCT_NOT_FOUND: "Produto não encontrado",
    UNAUTHORIZED_ACCESS: "Acesso não autorizado",
    DATABASE_ERROR: "Erro no banco de dados"
};

class ProductsService{
    
    async validateProductData(data) {
        if (!data.name || !data.description || data.price <= 0 || data.stock < 0) {
            throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_DATA);
        }
            if (isNaN(data.price) || data.price <= 0 || isNaN(data.stock) || data.stock < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_DATA);
            }
    }
    
    async getProducts() {
        try {
            const products = await database('SELECT * FROM products ORDER BY id ASC');
            return products;
        } catch (error) {
            console.error('Error in getProducts:', error);
            throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
        }
    }
    async addProduct(userId, data){
        try{
            await this.validateProductData(data);
            const product = await database('INSERT INTO PRODUCTS (name, description, price, stock, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
                [data.name, data.description, data.price, data.stock, userId
                ]);
                
            console.log(product.description);
            return product; 

        } catch (error){    
            throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
        }
    }
        async updateProduct(userId, id, data){
        try{
            await this.validateProductData(data);
            const product = await database('UPDATE PRODUCTS SET NAME = $1, DESCRIPTION = $2, PRICE = $3, STOCK = $4 WHERE ID = $5 AND USER_ID = $6 RETURNING *',
                [data.name, data.description, data.price, data.stock, id, userId]);

            if (!product) {
                throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
                }

            return product;
        } catch (error) {
            throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
        }
           
    }
    async deleteProduct(userId, id){
        try{
           await database('DELETE FROM products WHERE id = $1 AND user_id = $2', [id, userId]);
            return {message: 'Produto deletado com sucesso'};
        }catch (error){
            throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
        }
    }
}

export default ProductsService;

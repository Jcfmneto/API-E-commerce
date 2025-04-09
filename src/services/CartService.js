import database from '../models/database.js'

class CartService {
    constructor(){
        
    }
    
    async verifyStock(product_id, quantity){
        const product = await database('SELECT * FROM products WHERE id = $1', [product_id]);

        if(product.stock < quantity) {
            throw new Error('estoque insuficiente');
        }
    }
    
    
    async addToCart(data, quantity) {
        const {userId, product_id} = data;

        await this.verifyStock(product_id, quantity);

        console.log(userId, product_id, quantity);

        
        const cartItem = await database('INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [userId, product_id, quantity]
        )

        return cartItem;
    }

    async stockUpdate(product_id, quantity){

        const product = await database('SELECT * FROM products WHERE id = $1', [product_id]);

        const newStock = product.stock - quantity;

        await database('UPDATE products SET stock = $1 WHERE id = $2', [newStock, product_id]);
    }
}

export default CartService;

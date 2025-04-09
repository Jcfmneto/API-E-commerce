import CartService from '../services/CartService.js';

const cartService = new CartService();

class CartController {
    static async addToCart(req, res) {
        const { product_id, quantity } = req.body;
        const userId = req.user.id;

        const cartItem = await cartService.addToCart({userId, product_id}, quantity);

        res.status(200).json(cartItem);
    }


}

export default CartController;

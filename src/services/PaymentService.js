import Stripe from "stripe";
import database from "../models/database.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {

    async createCheckoutSession(userId){

        const cartItems = await database('SELECT cartitems.*, products.name, products.price FROM cartitems  INNER JOIN products ON products.id = cartitems.product_id WHERE cartitems.user_id = $1', 
            [userId])

        if(cartItems.length === 0){
            throw new Error("Cart is empty");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.map(item => ({    
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                userId: userId
            }
        })

        console.log('Created checkout session:', session.id);
        return session;
    }

}

export default PaymentService;
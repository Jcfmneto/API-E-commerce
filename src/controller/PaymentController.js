import PaymentService from "../services/PaymentService.js";
const paymentService = new PaymentService();

class PaymentController {

    static async createCheckoutSession(req, res){
        const { userId } = req.params;

        const session = await paymentService.createCheckoutSession(userId);

        return res.status(200).json(session);
    }

}

export default PaymentController;
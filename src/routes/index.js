import bodyParser from "body-parser";
import products from "./productsRoute.js";
import users from "./usersRoute.js";
import cart from "./CartRoute.js";
import payment from "./paymentRoute.js";





export default (app) => {
  app.use(
    bodyParser.json(),
    products,
    users,
    cart,
    payment
  );
};

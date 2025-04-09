import ProductsService from "../services/ProductsService.js";  

const productsService = new ProductsService();

class ProductsController {
    static async getProducts(req, res){
        try{
            const products = await productsService.getProducts();
        return res.status(200).json({products})
        } catch (error){
            return res.status(500).json({message: error.message})
        }
    }
        static async addProduct(req, res){
            try{
                const userId = req.user.id;
                const {name, description, price, stock} = req.body

                const product = await productsService.addProduct(userId, {name, description, price, stock});
                return res.status(201).json({message: "Produto adicionado com sucesso", product})
            }catch (error){
                return res.status(500).json({message: "erro ao adicionar produto", error: error.message})
            }
        }
        static async updateProduct(req, res){
            try{
                
                const userId = req.user.id;
                const {id} = req.params;
                const {name, description, price, stock} = req.body;
                const product = await productsService.updateProduct(userId, id, {name, description, price, stock});
                return res.status(200).json({message: "Produto atualizado com sucesso", product})
            }catch (error){
                return res.status(500).json({message: "erro ao atualizar produto", error: error.message})
            }
        }
        static async deleteProduct(req, res){
            try{
                const {id} = req.params;
                const userId = req.user.id;
              const result = await productsService.deleteProduct(userId, id);
                return res.status(200).json({message: "Produto deletado com sucesso", result})
            }catch (error){
                return res.status(500).json({message: "erro ao deletar produto", error: error.message})
            }
        }
}

export default ProductsController;
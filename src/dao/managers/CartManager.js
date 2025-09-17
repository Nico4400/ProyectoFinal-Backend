import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";


class CartManager {
    
    async getCarts() {
        try {
            const parseCarritos = await cartModel.find().lean();
            return {message: "OK" , rdo: parseCarritos}
        } 
        catch (e) {
            return {message: "ERROR" , rdo: "No hay carritos"}
        }
    }
    
    async getCartById(id) {
        try {
            const cart = await cartModel.findOne({_id: id});
            if (cart) 
                return {message: "OK" , rdo: cart}
            else 
            return {message: "ERROR" , rdo: "El carrito no existe"}
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener el carrito - " + e.message}
        }
    }
    
    async getProductsCartById(id) {
        try {
            const cart = await cartModel.findOne({_id: id}).populate('products.product');
            if(cart) 
                return {message: "OK" , rdo: cart.products}
            else 
                return {message: "ERROR" , rdo: "El carrito no existe o no tiene productos"}
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al obtener los productos del carrito - " + e.message}
        }
    }
    
    async postProductInCart(cId, pId, quantity) {
        try {
            const cart = await cartModel.findOne({_id: cId});
            if(cart) {
                const existingProducts = cart.products.find(product => product.product.toString() === pId);  
                if(existingProducts) {
                    existingProducts.quantity += quantity;
                } else {
                    cart.products.push({product: pId, quantity});
                }
                await cart.save();
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    
    async postCart(products) {
        try {
            const added = await cartModel.create(products);        
            return {message: "OK" , rdo: added}
        } catch (e) {
            return {message: "ERROR" , rdo: "Error al agregar el carrito." + e.message}
        }
    }
    
    async deleteAllProductsInCart(id) {
        try {
            const deleted = await cartModel.updateOne({_id: id}, {
            products: []
            });
            if(deleted.modifiedCount > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    
    async deleteProductInCart(cId, pId){
        try {
            const result = await cartModel.updateOne({_id: cId}, {
            $pull: {products : {product: new mongoose.Types.ObjectId(pId)}}
            });
            if(result.modifiedCount > 0) {
                return true;
            } else {
                return false;
            }      
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateCart(cId, cart){
        try {
            const result = await cartModel.updateOne({_id: cId}, cart);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
    async updateProductInCart(cId, pId, quantity){
        if(!quantity){
            return false;
        }
        try {
            const cart = await cartModel.findOne({_id: cId});
            if(!cart) {
                return false;
            }
            const product = cart.products.find(product => product.product.toString() === pId);
            if(!product) {
                return false;
            }
            product.quantity = quantity;
            await cart.save();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
export default CartManager;
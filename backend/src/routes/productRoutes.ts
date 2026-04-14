 import {Router} from 'express';
 import * as productController from '../controllers/peoductController';
 import { requireAuth } from '@clerk/express';

 const router = Router();

 // Get /api.products => get all the products 

 router.get('/',productController.getAllProducts);

 // Get /api/products/me => get products of the current user (protected)

 router.get("/my",requireAuth(),productController.getMyProducts);

 // Get /api/products/:id => get single product by ID

 router.get('/:id',productController.getProductById);

 //Post api/products => Create a new product

 router.post("/",requireAuth(),productController.createProduct);

 // put api/products/:id => update a product (protected)
 router.put("/:id",requireAuth(),productController.updateProduct);

 // delete api/products/:id => delete a product (protected)
 router.delete("/:id",requireAuth(),productController.deleteProduct);

export default router;
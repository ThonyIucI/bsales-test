import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import { getProducts } from '../controllers/products.js';
const routes = Router();
routes.get('/products', getProducts);
routes.get('/categories', getCategories);
export default routes;

import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import {
  getDiscounts,
  getPrices,
  getProducts,
} from '../controllers/products.js';
const routes = Router();
routes.post('/products', getProducts);
routes.get('/prices', getPrices);
routes.get('/discounts', getDiscounts);
routes.get('/categories', getCategories);
export default routes;

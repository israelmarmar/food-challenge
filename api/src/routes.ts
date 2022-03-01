import express from 'express';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import verifyJWT from './utils/verifyJWT';

const routes = express.Router();
const productControllers = new ProductsController();
const userControllers = new UsersController();

routes.get('/', productControllers.hello);
routes.put('/products/:productId', verifyJWT, productControllers.update);
routes.delete('/products/:productId', verifyJWT, productControllers.delete);
routes.get('/products/:productId', verifyJWT, productControllers.show);
routes.get('/products', verifyJWT, productControllers.index);
routes.post('/session', userControllers.login);
routes.post('/logout', userControllers.logout);

export default routes;
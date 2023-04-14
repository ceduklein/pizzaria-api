import { Router } from 'express';
import multer from 'multer';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { UserDetailsController } from './controllers/user/UserDetailsController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// User Routes
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new UserDetailsController().handle);

// Category Routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoriesController().handle);

// Product Routes
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product/list', isAuthenticated, new ListByCategoryController().handle);

// Order Routes
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };
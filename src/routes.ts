import { Router } from 'express';
import multer from 'multer';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { UserDetailsController } from './controllers/user/UserDetailsController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// User Routes
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new UserDetailsController().handle);

//Category Routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoriesController().handle);

//Product Routes
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product/list', isAuthenticated, new ListByCategoryController().handle);

export { router };
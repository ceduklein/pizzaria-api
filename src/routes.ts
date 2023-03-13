import { Router } from 'express';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { UserDetailsController } from './controllers/user/UserDetailsController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// User Routes
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new UserDetailsController().handle);

export { router };
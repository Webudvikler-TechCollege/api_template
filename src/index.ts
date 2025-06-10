import app from './app';
import { authController } from './controllers/authController';
import { dataController } from './controllers/dataController';
import { userController } from './controllers/userController';

app.use(    
    userController,
    dataController,
    authController
)
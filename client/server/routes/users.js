import express from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser 
} from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin'), getUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(authorize('admin'), deleteUser);

export default router;
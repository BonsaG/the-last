import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getLandlordProperties
} from '../controllers/properties.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getProperties)
  .post(protect, authorize('landlord', 'admin'), createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(protect, authorize('landlord', 'admin'), updateProperty)
  .delete(protect, authorize('landlord', 'admin'), deleteProperty);

router.get('/landlord/properties', protect, authorize('landlord'), getLandlordProperties);

export default router;
import express from 'express';
import {
  getPropertyReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviews.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getPropertyReviews)
  .post(protect, authorize('tenant'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('tenant'), updateReview)
  .delete(protect, authorize('tenant'), deleteReview);

export default router;
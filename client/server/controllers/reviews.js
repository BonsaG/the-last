import Review from '../models/Review.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import { ErrorResponse } from '../utils/errorResponse.js';

// @desc    Get all reviews for a property
// @route   GET /api/properties/:propertyId/reviews
// @access  Public
export const getPropertyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.propertyId });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
export const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new ErrorResponse('Review not found', 404));
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Create review
// @route   POST /api/properties/:propertyId/reviews
// @access  Private/Tenant
export const createReview = async (req, res, next) => {
  try {
    // Check if property exists
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return next(new ErrorResponse('Property not found', 404));
    }

    // Check if user has booked this property
    const booking = await Booking.findOne({
      propertyId: req.params.propertyId,
      tenantId: req.user.id,
      status: 'completed'
    });

    if (!booking) {
      return next(new ErrorResponse('You must complete a booking before reviewing', 400));
    }

    // Check if user has already reviewed this property
    const existingReview = await Review.findOne({
      propertyId: req.params.propertyId,
      tenantId: req.user.id
    });

    if (existingReview) {
      return next(new ErrorResponse('You have already reviewed this property', 400));
    }

    // Add property and user IDs to req.body
    req.body.propertyId = req.params.propertyId;
    req.body.tenantId = req.user.id;
    req.body.tenantName = req.user.name;

    const review = await Review.create(req.body);

    // Update property's average rating
    const reviews = await Review.find({ propertyId: req.params.propertyId });
    const averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Property.findByIdAndUpdate(req.params.propertyId, {
      averageRating: Math.round(averageRating * 10) / 10
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private/Tenant
export const updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return next(new ErrorResponse('Review not found', 404));
    }

    // Make sure review belongs to user
    if (review.tenantId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to update this review', 403));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Update property's average rating
    const reviews = await Review.find({ propertyId: review.propertyId });
    const averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Property.findByIdAndUpdate(review.propertyId, {
      averageRating: Math.round(averageRating * 10) / 10
    });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Tenant
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new ErrorResponse('Review not found', 404));
    }

    // Make sure review belongs to user
    if (review.tenantId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this review', 403));
    }

    await review.deleteOne();

    // Update property's average rating
    const reviews = await Review.find({ propertyId: review.propertyId });
    const averageRating = reviews.length 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
      : 0;

    await Property.findByIdAndUpdate(review.propertyId, {
      averageRating: Math.round(averageRating * 10) / 10
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
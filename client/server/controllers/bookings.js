import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { ErrorResponse } from '../utils/errorResponse.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    let query;

    // If user is tenant, get only their bookings
    if (req.user.role === 'tenant') {
      query = Booking.find({ tenantId: req.user.id });
    }
    // If user is landlord, get bookings for their properties
    else if (req.user.role === 'landlord') {
      const properties = await Property.find({ landlordId: req.user.id });
      const propertyIds = properties.map(property => property._id);
      query = Booking.find({ propertyId: { $in: propertyIds } });
    }
    // If admin, get all bookings
    else {
      query = Booking.find();
    }

    const bookings = await query.sort('-createdAt');

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ErrorResponse('Booking not found', 404));
    }

    // Make sure user has access to booking
    if (
      req.user.role === 'tenant' && booking.tenantId.toString() !== req.user.id ||
      req.user.role === 'landlord' && booking.landlordId.toString() !== req.user.id
    ) {
      return next(new ErrorResponse('Not authorized to access this booking', 403));
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private/Tenant
export const createBooking = async (req, res, next) => {
  try {
    // Check if property exists
    const property = await Property.findById(req.body.propertyId);

    if (!property) {
      return next(new ErrorResponse('Property not found', 404));
    }

    // Check if property is available
    if (property.status !== 'available') {
      return next(new ErrorResponse('Property is not available for booking', 400));
    }

    // Add user and property info to req.body
    req.body.tenantId = req.user.id;
    req.body.landlordId = property.landlordId;

    const booking = await Booking.create(req.body);

    // Update property status
    await Property.findByIdAndUpdate(req.body.propertyId, { status: 'booked' });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ErrorResponse('Booking not found', 404));
    }

    // Make sure user has access to booking
    if (
      req.user.role === 'tenant' && booking.tenantId.toString() !== req.user.id ||
      req.user.role === 'landlord' && booking.landlordId.toString() !== req.user.id
    ) {
      return next(new ErrorResponse('Not authorized to update this booking', 403));
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ErrorResponse('Booking not found', 404));
    }

    // Make sure user has access to booking
    if (
      req.user.role === 'tenant' && booking.tenantId.toString() !== req.user.id ||
      req.user.role === 'landlord' && booking.landlordId.toString() !== req.user.id
    ) {
      return next(new ErrorResponse('Not authorized to delete this booking', 403));
    }

    await booking.deleteOne();

    // Update property status back to available
    await Property.findByIdAndUpdate(booking.propertyId, { status: 'available' });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
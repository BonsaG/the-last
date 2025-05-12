import Property from '../models/Property.js';
import { ErrorResponse } from '../utils/errorResponse.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .populate('reviews')
      .sort('-createdAt');
    
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('reviews');

    if (!property) {
      return next(new ErrorResponse('Property not found', 404));
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private/Landlord
export const createProperty = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.landlordId = req.user.id;
    req.body.landlordName = req.user.name;

    const property = await Property.create(req.body);

    res.status(201).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Landlord
export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return next(new ErrorResponse('Property not found', 404));
    }

    // Make sure user is property owner
    if (property.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to update this property', 403));
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Landlord
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return next(new ErrorResponse('Property not found', 404));
    }

    // Make sure user is property owner
    if (property.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this property', 403));
    }

    await property.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Get landlord properties
// @route   GET /api/properties/landlord/properties
// @access  Private/Landlord
export const getLandlordProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ landlordId: req.user.id })
      .populate('reviews')
      .sort('-createdAt');

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};
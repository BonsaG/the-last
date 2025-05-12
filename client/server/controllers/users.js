import User from '../models/User.js';
import { ErrorResponse } from '../utils/errorResponse.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Users can only view their own profile unless they're an admin
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return next(new ErrorResponse('Not authorized to access this route', 403));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Users can only update their own profile unless they're an admin
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return next(new ErrorResponse('Not authorized to update this profile', 403));
    }

    // Remove password from update object if it exists
    const { password, role, ...updateData } = req.body;

    // Only admin can update roles
    if (role && req.user.role === 'admin') {
      updateData.role = role;
    }

    user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    await user.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
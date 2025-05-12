import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  area: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  availabilityCalendar: [{
    date: Date,
    isAvailable: Boolean
  }],
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance', 'pending', 'rejected'],
    default: 'pending'
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate average rating when reviews are modified
propertySchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    this.populate('reviews').then(() => {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = totalRating / this.reviews.length;
      next();
    });
  } else {
    this.averageRating = 0;
    next();
  }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
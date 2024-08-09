const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startCoordinates: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
    },
    coordinates: {
        type: [String],  // Array of numbers: [longitude, latitude]
        required: true,
    }
},
endCoordinates: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
    },
    coordinates: {
        type: [String],  // Array of numbers: [longitude, latitude]
        required: true,
    }
},
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  routeInfo: {
    distance: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    }
  }
});
const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;

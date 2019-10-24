import mongoose from 'mongoose';

const { Schema } = mongoose;

const userPlaceSchema = new Schema({
    name: String,
    description: String,
    tags: [String],
    position: {lat: String, lng: String},
    publishingDate: { type : Date, default: Date.now },
});

const UserPlace = mongoose.model('userMarker', userPlaceSchema);

export default UserPlace;

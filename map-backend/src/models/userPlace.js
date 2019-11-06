import mongoose from 'mongoose';
import Post from "./post";

const { Schema } = mongoose;

const UserPlaceSchema = new Schema({
    name: String,
    description: String,
    detailedPosition: String,
    tags: [String],
    position: {lat: Number, lng: Number},
    publishingDate: { type : Date, default: Date.now },
});

const UserPlace = mongoose.model('userMarker', UserPlaceSchema);

export default UserPlace;

import mongoose from 'mongoose';
import Comment from "./comment";

const { Schema } = mongoose;

const UserPlaceSchema = new Schema({
    name: String,
    description: String,
    detailedPosition: String,
    tags: [String],
    position: {lat: Number, lng: Number},
    publishingDate: { type : Date, default: Date.now },
    primaryPositionType: String,
    secondaryPositionType: String,
    radius: Number,
    commentList: [],
});

UserPlaceSchema.statics.findByType = function(primary){
    return this.find({primaryPositionType: primary});
};

UserPlaceSchema.statics.findByObjectID = function(id) {
    return this.find({_id: id});
};

const UserPlace = mongoose.model('userMarker', UserPlaceSchema);

export default UserPlace;

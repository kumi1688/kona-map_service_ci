import mongoose from 'mongoose';

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
});

UserPlaceSchema.statics.findByType = function(primary){
    return this.find({primaryPositionType: primary});
};

const UserPlace = mongoose.model('userMarker', UserPlaceSchema);

export default UserPlace;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    title: String,
    body: String,
    publishingDate: { type : Date, default: Date.now },
    username: String
});

CommentSchema.statics.findByUsername = function(username){
    return this.find({username});
};

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;

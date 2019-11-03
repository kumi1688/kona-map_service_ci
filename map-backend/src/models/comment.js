import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    title: String,
    body: String,
    recommend: Boolean,
    publishingDate: { type : Date, default: Date.now },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;

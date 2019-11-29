import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    firstLivingArea: String,
    secondLivingArea: String,
    gender: String,
    age: String,
    providingInfo: Boolean,
    });

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign({
            _id: this.id,
        username: this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

UserSchema.statics.findByUsername = function(username){
    return this.findOne({username});
};

UserSchema.statics.findByAge = function(age){
    return this.find({age});
};

UserSchema.statics.findByGender = function(gender){
    return this.find({gender});
};

UserSchema.statics.findByJob = function(job){
    return this.find({job});
};

UserSchema.statics.getTotalNumber = function(){
    return this.find({});
};

UserSchema.statics.getManNumber = function(){
    return this.find({gender: '남자'});
};

UserSchema.statics.getWomanNumber = function(){
    return this.find({gender: '여자'});
};

const User = mongoose.model('User', UserSchema);
export default User;

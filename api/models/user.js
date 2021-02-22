const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength:1,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        minlength:10,
    //    unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    updated_at: { type: Date },
	created_at: { type: Date }
});

UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    } else {
    }

    bcrypt
        .genSalt(12)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            //user.updated_at = Date.now();
			now = Date.now();
			user.updated_at = now;
		  if ( !user.created_at ) {
			user.created_at = now;
		  }
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

module.exports = mongoose.model('User', UserSchema);

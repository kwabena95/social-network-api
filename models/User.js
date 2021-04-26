const { Schema, model } = require('mongoose');

const validateEmail = email => {
    const regex = /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})$/;
    return regex.test(email);
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Email address does not match! Correct email format "bob@mail.com"'],
            match: /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    },

);

// get friend count
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;
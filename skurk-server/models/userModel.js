const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Namn krävs"]
    },
    email: {
        type: String,
        required: [true, "Email krävs"],
        unique: [true, "Email finns redan"]
    },
    password: {
        type: String,
        required: [true, "Lösenord krävs"]
    },
}, {
    timestamps: true

})

module.exports = mongoose.model('User', userSchema);
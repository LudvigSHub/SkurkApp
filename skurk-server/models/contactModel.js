const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Namn krävs"]
    },
    email: {
        type: String,
        required: [true, "Email krävs"]
    },
    phone: {
        type: String,
        required: [true, "Telefonnummer krävs"]
    },
}, {
    timestamps: true

});

// Här säger vi ungefär "Skapa en modell som heter Contact, som är baserad på contactSchema, och exportera den"
module.exports = mongoose.model('Contact', contactSchema);

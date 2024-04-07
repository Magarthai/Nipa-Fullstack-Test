const mongoose = require('mongoose');

let ticketSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        required: true,
    },
    selectTopic:{
        type: String,
        required: true
    },
    selectTopic:{
        type: String,
        default: "pending"
    },
    img: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
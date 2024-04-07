const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const firebaseConfig = require('../config/firebase');
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const Ticket = require('../models/Ticket.model');

const { ref, uploadBytes, getStorage, getDownloadURL } = require('firebase/storage');
const storage = getStorage();
const createTicket = async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            email: req.body.email,
            detail: req.body.detail,
            selectTopic: req.body.selectTopic,
            img: req.body.file, 
        };

        const createdTicket = await Ticket.create(body);
        
        res.json({ message: "Ticket created successfully", ticket: createdTicket });
        console.log("Ticket created successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

module.exports = {
    createTicket
};

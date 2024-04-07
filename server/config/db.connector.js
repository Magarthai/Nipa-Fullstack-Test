const Mongoose = require("mongoose")

const dbConnect = () => {
    const connect = Mongoose.connect(process.env.MONGO_URL)
    console.log("Database is connected successfully!");
}

module.exports = dbConnect;
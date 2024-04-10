const express = require('express');
const dbConnect = require('./config/db.connector');
const app = express();
const firebaseConfig = require('./config/firebase');
const dotenv = require('dotenv').config();
const authRouter = require('./routes/authRoute');
const ticketRouter = require('./routes/ticketRoute');
const DashboardRoute = require('./routes/DashboardRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

dbConnect();
app.use(cors(
    {
        credentials:true,
        origin: ['http://localhost:3000']
    }
));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/dashboard', DashboardRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
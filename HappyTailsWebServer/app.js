require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); 
const {swaggerDefinition} = require('./swagger-definition'); 
const cors = require('cors');

const mongoUser = process.env.MONGO_USERNAME;
const mongoPass = process.env.MONGO_PASSWORD;

const appRoutes = require('./src/routes/appRoutes');

const mongoUri = `mongodb+srv://${mongoUser}:${mongoPass}@happytails.4iol3mf.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT;

app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect(mongoUri, {
    useNewUrlParser: true

});

// set the default connection
const db = mongoose.connection;

// bind connection to error event - to get notifications of connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('Connected to the database');  
  });

//bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.use(express.json());

// API routes
app.use('/api', appRoutes);


app.listen(PORT, () =>
    console.log(`Thw server is up and running on port ${PORT}`)
);
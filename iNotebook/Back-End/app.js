const express = require("express");
const connectToMongoDB = require("./db");
const cors = require('cors');

// Connect to MongoDB!
connectToMongoDB()

// Initializing the app
const app = express();

// Hostname and Port
const hostname = "127.0.0.1";
const port = "3000";

// Using a middleware!
app.use(express.json())

// enable CORS middleware
app.use(cors());


// Available Routes!
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/notes', require('./routes/notesRoute'))
app.use('/api/userContact', require('./routes/contactRoute'))

// Listening the server!
app.listen(port, hostname, () => {
    console.log(`Your app is running on http://${hostname}:${port}`)
})
const express = require('express'); // Loading Express module
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const cors = require('cors');
const path = require('path');

// Connect Database
const connectDB = require('./config/db');
//connectDB();

app.use(cors());
// Initialize JSON body parser
app.use(bodyParser.json());

// Add Express Port
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use('/api/search', require('./routes/search'));
app.use('/api/getall', require('./routes/getall'));

app.use('/', require('./routes/redirect'));

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

// Start Express
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

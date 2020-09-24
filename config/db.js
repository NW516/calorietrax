const config = require('config'); // Loading config module

const db = config.get('mongouri'); // Fetching MongoDB URL from config.json

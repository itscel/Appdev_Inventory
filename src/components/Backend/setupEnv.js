const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Define the path for the .env file
const envPath = path.join(__dirname, '.env');

// Generate the .env content
const envContent = `
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=inventory_db
JWT_SECRET=${crypto.randomBytes(64).toString('hex')}
`;

// Write the content to the specified path
fs.writeFileSync(envPath, envContent.trim());

console.log('.env file created at src/components/backend with a new JWT_SECRET');

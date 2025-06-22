// .env/qa.environment.js
require('dotenv').config(); // Load environment variables from .env file

// Base URL for the GoRest API
process.env.BASE_URL = "https://gorest.co.in/public/v2";

// Your Bearer Token for authorization (replace with your actual token)
// IMPORTANT: In a real project, this token should be stored securely (e.g., GitHub Secrets, Vault)
// and not committed directly to version control.
process.env.AUTH_TOKEN = "5582f007d8a190ac92d47850fc3ccb4dc14c96e0de5bf83db58270734a7952fe";

// You can add other QA-specific variables here
process.env.ENVIRONMENT = "QA";
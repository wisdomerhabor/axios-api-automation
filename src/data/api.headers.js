// src/data/apiHeaders.js
export default class ApiHeaders {
  /**
   * Generates standard headers for API requests.
   * @returns {object} Headers object.
   */
  getAuthHeaders() {
    // Load AUTH_TOKEN from environment variables (defined in .env/qa.environment.js)
    const authToken = process.env.AUTH_TOKEN;
    if (!authToken) {
      throw new Error(
        "AUTH_TOKEN environment variable is not set. Please check .env/qa.environment.js"
      ); // return error
    }
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`, // Bearer token for authorization
    };
  }

  /**
   * Generates headers for unauthenticated requests.
   * @returns {object} Headers object.
   */
  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
}

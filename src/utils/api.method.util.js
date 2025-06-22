// src/utils/ApiMethodUtil.js
import axios from 'axios';

/**
 * A utility class for making API requests with Axios.
 * Includes basic request/response logging.
 */
export default class ApiMethodUtil {
  constructor() {
    // Create an Axios instance with a base URL if available
    this.instance = axios.create({
      baseURL: process.env.BASE_URL, // Loaded from qa.environment.js
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add Authorization header dynamically when token is available
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Request interceptor to log request details
    // config data is from the request information being sent to the server
    this.instance.interceptors.request.use(
      (config) => {
        // Store a timestamp to calculate latency later
        config.requestStartTime = Date.now();
        console.log(`\n--- API Request ---`);
        console.log(`Method: ${config.method.toUpperCase()}`);
        console.log(`URL: ${config.baseURL ? config.baseURL + config.url : config.url}`);
        console.log(`Headers: ${JSON.stringify(config.headers, null, 2)}`);
        if (config.data) {
          console.log(`Payload: ${JSON.stringify(config.data, null, 2)}`);
        }
        if (config.params) {
            console.log(`Params: ${JSON.stringify(config.params, null, 2)}`);
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor to log response details and calculate latency
     // response data is from the respond information being sent from the server
    this.instance.interceptors.response.use(
      (response) => {
        const latency = Date.now() - response.config.requestStartTime;
        console.log(`--- API Response ---`);
        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log(`Latency: ${latency}ms`);
        console.log(`Response Data: ${JSON.stringify(response.data, null, 2)}`);
        console.log(`--------------------\n`);
        return response;
      },
      (error) => {
        const latency = error.config ? Date.now() - error.config.requestStartTime : 'N/A';
        console.error(`\n--- API Error Response ---`);
        console.error(`Status: ${error.response ? error.response.status : 'N/A'} ${error.response ? error.response.statusText : 'N/A'}`);
        console.error(`Latency: ${latency}ms`);
        if (error.response && error.response.data) {
          console.error(`Error Data: ${JSON.stringify(error.response.data, null, 2)}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Request setup error:', error.message);
        }
        console.error(`-------------------------\n`);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Makes a GET request.
   * @param {string} url - The endpoint URL.
   * @param {object} headers - Request headers.
   * @param {object} params - URL parameters.
   * @returns {Promise<object>} - Axios response object.
   */
  async GET(url, headers = {}, params = {}) {
    try {
      const response = await this.instance.get(url, { headers, params });
      return response;
    } catch (error) {
      // Re-throw the error so tests can catch and assert on it
      throw error;
    }
  }

  /**
   * Makes a POST request.
   * @param {string} url - The endpoint URL.
   * @param {object} data - Request body data.
   * @param {object} headers - Request headers.
   * @returns {Promise<object>} - Axios response object.
   */
  async POST(url, data = {}, headers = {}) {
    try {
      const response = await this.instance.post(url, data, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Makes a PUT request.
   * @param {string} url - The endpoint URL.
   * @param {object} data - Request body data.
   * @param {object} headers - Request headers.
   * @returns {Promise<object>} - Axios response object.
   */
  async PUT(url, data = {}, headers = {}) {
    try {
      const response = await this.instance.put(url, data, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Makes a PATCH request.
   * @param {string} url - The endpoint URL.
   * @param {object} data - Request body data.
   * @param {object} headers - Request headers.
   * @returns {Promise<object>} - Axios response object.
   */
  async PATCH(url, data = {}, headers = {}) {
    try {
      const response = await this.instance.patch(url, data, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Makes a DELETE request.
   * @param {string} url - The endpoint URL.
   * @param {object} headers - Request headers.
   * @returns {Promise<object>} - Axios response object.
   */
  async DELETE(url, headers = {}) {
    try {
      const response = await this.instance.delete(url, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
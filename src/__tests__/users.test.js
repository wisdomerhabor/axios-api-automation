// src/__tests__/api/users.test.js
import {
    wait,
    apicall,
    apiHeaders,
    testPayloads,
    faker, 
    expect,
    fail,
} from "../common/imports.js"

// Define the base path for users endpoint
const USERS_PATH = '/users';

// Variable to store the ID of a newly created user for update/delete tests
let createdUserId = null;
let createdUserEmail = null;

describe('GoRest API User Management', () => {

  // Test Case 1: Create a new user (POST)
  test('should successfully create a new user', async () => {
    const payload = testPayloads.createUniqueUserPayload();
    createdUserEmail = payload.email; // Store the email for potential future use

    try {
      const response = await apicall.POST(USERS_PATH, payload, apiHeaders.getAuthHeaders());

      // Assertions
      expect(response.status).toBe(201); // 201 Created
      expect(response.data).toBeDefined();
      expect(response.data.id).toBeDefined();
      expect(response.data.name).toBe(payload.name);
      expect(response.data.email).toBe(payload.email);
      expect(response.data.gender).toBe(payload.gender);
      expect(response.data.status).toBe(payload.status);

      // Store the created user ID for subsequent tests (e.g., update, delete)
      createdUserId = response.data.id;
      console.log(`Created User ID: ${createdUserId}, Email: ${createdUserEmail}`);

    } catch (error) {
      // If the request fails, Jest will mark the test as failed.
      // You can add more specific error handling/assertions here if needed.
      throw new Error(`Failed to create user: ${error.message}`);
    }
  });

  // Test Case 2: List all users (GET)
  test('should successfully list users', async () => {
    try {
      const response = await apicall.GET(USERS_PATH, apiHeaders.getAuthHeaders());

      // Assertions
      expect(response.status).toBe(200); // 200 OK
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);

      // Optional: Verify that the previously created user is in the list
      if (createdUserId) {
        const foundUser = response.data.find(user => user.id === createdUserId);
        expect(foundUser).toBeDefined();
        expect(foundUser.email).toBe(createdUserEmail);
      }

    } catch (error) {
      throw new Error(`Failed to list users: ${error.message}`);
    }
  });

  // Test Case 3: Update an existing user (PUT/PATCH)
  // Note: The GoRest API uses PUT for full updates. PATCH for partial.
  // We'll use PUT as requested in your example.
  test('should successfully update an existing user', async () => {
    // Ensure a user was created in the previous test
    if (!createdUserId) {
      // If the create user test failed or wasn't run, we can't update.
      // In a real scenario, you might want to create a user here if createdUserId is null.
      console.warn('No user ID found to update. Skipping update test.');
      return; // Skip this test if no user ID is available
    }

    const newEmail = faker.internet.email().toLowerCase(); // Generate a new unique email for update
    const updatePayload = testPayloads.updateUserPayload(newEmail);
    const updateUserPath = `${USERS_PATH}/${createdUserId}`;

    try {
      const response = await apicall.PUT(updateUserPath, updatePayload, apiHeaders.getAuthHeaders());

      // Assertions
      expect(response.status).toBe(200); // 200 OK
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(createdUserId);
      expect(response.data.name).toBe(updatePayload.name);
      expect(response.data.email).toBe(updatePayload.email);
      expect(response.data.status).toBe(updatePayload.status);

      console.log(`Updated User ID: ${createdUserId} with new email: ${newEmail}`);

    } catch (error) {
      throw new Error(`Failed to update user ${createdUserId}: ${error.message}`);
    }
  });

  // Optional Test Case: Get a specific user by ID
  test('should successfully get a user by ID', async () => {
    if (!createdUserId) {
      console.warn('No user ID found to retrieve. Skipping get by ID test.');
      return;
    }
    const getUserPath = `${USERS_PATH}/${createdUserId}`;

    try {
      const response = await apicall.GET(getUserPath, apiHeaders.getAuthHeaders());

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(createdUserId);
      expect(response.data.email).toBeDefined(); // Verify email is present
    } catch (error) {
      throw new Error(`Failed to get user by ID ${createdUserId}: ${error.message}`);
    }
  });

  // Optional Test Case: Delete the created user
  test('should successfully delete the created user', async () => {
    if (!createdUserId) {
      console.warn('No user ID found to delete. Skipping delete test.');
      return;
    }
    const deleteUserPath = `${USERS_PATH}/${createdUserId}`;

    try {
      const response = await apicall.DELETE(deleteUserPath, apiHeaders.getAuthHeaders());

      // GoRest API returns 204 No Content for successful deletion
      expect(response.status).toBe(204);
      // Expect no data for 204 No Content
      expect(response.data).toBe('');

      console.log(`Successfully deleted User ID: ${createdUserId}`);

    } catch (error) {
      throw new Error(`Failed to delete user ${createdUserId}: ${error.message}`);
    }
  });

  // Optional Test Case: Verify user is deleted (GET by ID should return 404)
  test('should return 404 after user is deleted', async () => {
    if (!createdUserId) {
      console.warn('No user ID to verify deletion. Skipping verification test.');
      return;
    }
    const getUserPath = `${USERS_PATH}/${createdUserId}`;

    try {
      // Expect this call to throw an error because of a 404 status
      await apicall.GET(getUserPath, apiHeaders.getAuthHeaders());
      fail('Expected API call to throw an error for a deleted user but it did not.');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(404); // 404 Not Found
      expect(error.response.data.message).toBe('Resource not found');
      console.log(`Verified User ID ${createdUserId} is no longer found (404).`);
    }
  });
});
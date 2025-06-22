// src/data/testPayloads.js
import { faker } from "@faker-js/faker";

export default class TestPayloads {
  /**
   * Generates a dynamic payload for creating a new user.
   * Uses faker to ensure unique email addresses.
   * @returns {object} User creation payload.
   */
  createUniqueUserPayload() {
    return {
      name: faker.person.fullName(),
      gender: faker.helpers.arrayElement(["male", "female"]), // Randomly selects male or female
      email: faker.internet.email().toLowerCase(), // Generates a unique email
      status: faker.helpers.arrayElement(["active", "inactive"]), // Randomly selects active or inactive
    };
  }

  /**
   * Generates a payload for updating a user.
   * @param {string} newEmail - The new email address for the user.
   * @returns {object} User update payload.
   */
  updateUserPayload(newEmail) {
    return {
      name: "Updated Name " + faker.string.uuid().substring(0, 4), // Add a random suffix for uniqueness
      email: newEmail,
      status: "active", // Assuming we always set status to active for updates in this example
    };
  }
}

// src/utils/imports.js

// IMPORTS
import ApiMethodUtil from "../utils/api.method.util.js";
import ApiHeaders from "../data/api.headers.js"
import TestPayloads from "../data/test.payloads.js"
import { faker, fakerEN_NG } from '@faker-js/faker'; // Import faker for dynamic data if needed
import expect from "expect";

// CONSTANTS
const wait = async (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, waitTime);
  });
};

const apicall = new ApiMethodUtil();
const apiHeaders = new ApiHeaders();
const testPayloads = new TestPayloads();
const fail = (msg) => { throw new Error(msg); };



// EXPORTS
export {
    wait,
    apicall,
    apiHeaders,
    testPayloads,
    faker, 
    fakerEN_NG,
    expect,
    fail,
}
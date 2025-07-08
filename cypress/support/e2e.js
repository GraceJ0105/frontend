// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global hooks or configurations
before(() => {
  // Code here runs once before all tests
  cy.log("Global setup: before all tests");
});

beforeEach(() => {
  // Code here runs before each test
  cy.log("Global setup: before each test");
});

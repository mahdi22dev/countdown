// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// In cypress/support/commands.js
Cypress.Commands.add("login", () => {
  cy.session(
    () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.get("input[name=email]").type("test@gmail.com");
      cy.get("input[name=password]").type(`mahdi2019{enter}`);
      cy.url().should("include", "/");
    },
    {
      validate: () => {
        cy.getCookie("next-auth.csrf-token").should("exist");
      },
    }
  );
});

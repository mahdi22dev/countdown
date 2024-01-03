import "cypress-xpath";

describe("countdown login tests", () => {
  it("visit url", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.task("log", "This is console log : Navigated to home page");
  });
});

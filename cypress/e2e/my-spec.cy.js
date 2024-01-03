import "cypress-xpath";

describe("countdown login tests", () => {
  it("visit url", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type(`mahdi2019{enter}`);
    cy.task("log", "This is console log : Navigated to login page");
  });
});

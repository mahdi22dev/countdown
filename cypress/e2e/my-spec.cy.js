import "cypress-xpath";

describe("countdown login tests", () => {
  it("visit url", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.xpath("/html/body/div[3rg]/main/div/div[3]/form/div[1]/input");
    cy.task("log", "This is console log : Navigated to home page");
  });
});

describe("middleware", () => {
  it("middleware tests", () => {
    cy.visit("http://localhost:3001/user/profile");
    cy.url().should("include", "http://localhost:3001/auth/login");
  });
});

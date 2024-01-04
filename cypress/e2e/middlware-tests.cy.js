describe("middleware", () => {
  it("middleware tests", () => {
    cy.visit("http://localhost:3000/user/profile");
    cy.url().should("include", "http://localhost:3000/auth/login");
  });
});

describe("countdown login tests", () => {
  it("visit login url and validate coockies", () => {
    cy.login();
  });

  it("should display 'Your latest countdowns'", () => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Use cy.contains() to check for the text
    cy.contains("Your latest countdowns").should("be.visible");
  });

  it("should display 'Upcoming Movies'", () => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Use cy.contains() to check for the text
    cy.contains("Upcoming Movies").should("be.visible");
  });

  it("should visit profile page and check for CSRF token", () => {
    cy.visit("http://localhost:3000/user/profile");
    cy.getCookie("next-auth.csrf-token").should("exist");
  });
});

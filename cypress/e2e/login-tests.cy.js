describe("Countdown login tests", () => {
  // Test to visit login URL, enter credentials, and validate cookies
  it("visit login url and validate cookies", () => {
    // Visit the login page
    cy.visit("http://localhost:3000/auth/login");

    // Enter test credentials
    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type(`mahdi2019{enter}`);

    // Ensure redirection to the home page
    cy.url().should("include", "/");

    // Validate the existence of the CSRF token cookie
    cy.getCookie("next-auth.csrf-token").should("exist");
  });

  // Test to check for the presence of 'Your latest countdowns' on the home page
  it("should display 'Your latest countdowns'", () => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Use cy.contains() to check for the text
    cy.contains("Your latest countdowns").should("be.visible");
  });

  // Test to check for the presence of 'Upcoming Movies' on the home page
  it("should display 'Upcoming Movies'", () => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Use cy.contains() to check for the text
    cy.contains("Upcoming Movies").should("be.visible");
  });

  // Test to visit the profile page and validate the existence of the CSRF token cookie
  it("should visit profile page and check for CSRF token", () => {
    // Visit the profile page
    cy.visit("http://localhost:3000/user/profile");

    // Validate the existence of the CSRF token cookie
    cy.getCookie("next-auth.csrf-token").should("exist");
  });
});

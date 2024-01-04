describe("Countdown login tests", () => {
  // Perform common setup actions before each test
  beforeEach(() => {
    // Visit the login page and log in if not already logged in
    cy.visit("http://localhost:3000/auth/login");

    // Log in with your credentials
    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type(`mahdi2019{enter}`);
    // Wait for login to complete, if needed
    // Add any additional setup steps if necessary
  });

  // Test to visit login URL, enter credentials, and validate cookies
  it("visit login url and validate cookies", () => {
    cy.visit("http://localhost:3000/auth/login");
    // Ensure redirection to the home page
    cy.url().should("include", "/");
    // Validate the existence of the CSRF token cookie
    cy.getCookie("next-auth.csrf-token").should("exist");
  });

  // Test to check for the presence of 'Your latest countdowns' on the home page
  it("should display 'Your latest countdowns'", () => {
    // Validate the URL
    cy.url().should("include", "http://localhost:3000");
    cy.contains("create countdown", { matchCase: false }).should("exist");
  });
});

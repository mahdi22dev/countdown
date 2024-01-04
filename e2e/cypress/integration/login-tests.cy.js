describe("Countdown login tests", () => {
  // Test to visit login URL, enter credentials, and validate cookies
  it("visit login url and validate cookies", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.contains("div", "Guest Sign in").click();
    // Validate the existence of the CSRF token cookie
    cy.getCookie("next-auth.csrf-token").should("exist");
    cy.wait(15000);
    cy.contains("Your latest countdowns").should("exist");
    cy.contains("Upcoming Movies").should("exist");
  });
});

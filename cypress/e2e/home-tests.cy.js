describe("Home page tests", () => {
  // Test to check for the presence of 'Upcoming Movies' on the home page
  it("should display 'Upcoming Movies'", () => {
    // Visit the home page
    cy.visit("http://localhost:3001");

    // Use cy.contains() to check for the text
    cy.contains("Upcoming Movies").should("exist");
    // Use cy.contains() to check for the text
    cy.contains("Please sign in to add your countdowns").should("exist");
  });
});

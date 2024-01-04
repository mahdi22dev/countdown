describe("Countdown login tests", () => {
  // Test to visit login URL, enter credentials, and validate cookies
  it("visit login url and validate cookies", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type(`mahdi2019`);
    cy.xpath("/html/body/div[3]/main/div/div[3]/form/div[3]/button").click();
    // Validate the existence of the CSRF token cookie
    cy.getCookie("next-auth.csrf-token").should("exist");
    cy.wait(10000);
    cy.contains("create countdown").should("exist");
  });
});

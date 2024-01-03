import "cypress-xpath";

describe("The Login Page", () => {
  it("sets auth cookie when logging in via form submission", function () {
    // destructuring assignment of the this.currentUser object

    cy.visit("http://localhost:3000/auth/login");

    // put the email
    cy.xpath("/html/body/div[3]/main/div/div[3]/form/div[1]/input").type(
      "test@gmail.com"
    );

    // put the password
    cy.get("/html/body/div[3]/main/div/div[3]/form/div[2]/div[2]/input").type(
      `mahdi2019`
    );

    // we should be redirected to / home page
    cy.url().should("include", "/");

    // sumbit form
    y.xpath("/html/body/div[3]/main/div/div[3]/form/div[3]/button").click();

    // our auth cookie should be present
    cy.getCookie("next-auth.csrf-token").should("exist");

    // // UI should reflect this user being logged in
    // cy.get("h1").should("contain", "jane.lane");
  });
});

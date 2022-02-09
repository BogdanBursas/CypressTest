context(`Gym tests`, () => {
    before(() => {
        // the code written here is run once before everything
        cy.visit("https://gymacces.ro/");
    });

    beforeEach(() => {
        // the code written here is run before every test
    });

    it(`Check the header`, () => {
        // this is a test
        // i will add multiple tests because the best practice is to check a single element in one test
        // multiple checks (assertions) in this case: should()
        // in this way it will be easy for debugging, if something failed you will know exactly where the problem is
        cy.get("h1").should("be.visible").should("have.text", "Index of /");
    });

    it(`Check the Name text`, () => {
        // Here can be cy.contains directly
        // Using cy.get().contains it will search with that contains into that get, in this case in tbody
        // To be sure that searched text, in this case Name is in that section and not on the bottom of the page
        // it was not necessary in this case, i make it this way as an example
        cy.get("tbody")
            .contains("Name")
            .should("have.text", "Name")
            .should("have.attr", "href", "?C=N;O=D")
            .should("have.css", "color", "rgb(0, 0, 238)")
            .should("be.visible");
    });

    it(`Check the horizontal lines`, () => {
        cy.get("tbody")
            .find(`[colspan="5"]`)
            .should("have.length", "2")
            .should("be.visible");
    });

    it(`Check the cgi-bin/ link`, () => {
        cy.contains("cgi-bin/").should("have.attr", "href", "cgi-bin/");
        cy.contains("cgi-bin/")
            .parent()
            .siblings()
            .eq(1)
            .should("have.text", "2021-05-05 14:27  ");
    });

    it(`Navigate on the first page and check the url pathname`, () => {
        cy.contains("cgi-bin/").click();
        cy.location("pathname").should("eq", "/cgi-bin/");
    });

    it(`Check the text on the second page`, () => {
        cy.get("h1").should("have.text", "Forbidden");
        // here i am checking 2 elements, i do it in this way, to explain that it can be in this way
        // but if the first assert failed the entire code after that failed test be skipped
        cy.get("p")
            .first()
            .should("have.text", "You don't have permission to access this resource.");
        cy.get("p")
            .last()
            .should(
                "have.text",
                "Additionally, a 403 Forbidden\nerror was encountered while trying to use an ErrorDocument to handle the request."
            );
    });

    it(`Navigate on the first page and check the url`, () => {
        cy.go("back");
        cy.url().should("eq", "https://gymacces.ro/");
    });
});

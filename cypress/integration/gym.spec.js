context(`Gym tests`, () => {
    before(() => {
        cy.visit("https://gymacces.ro/");
    });

    it(`Check the header`, () => {
        cy.get("h1").should("be.visible").should("have.text", "Index of /");
    });

    it(`Check the Name text`, () => {
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


describe("Habitat Type field behavior", () => {
  it("should only show the Habitat Type label after selecting a Broad Habitat", () => {
    cy.visit("/");

    // Habitat Type label should not exist initially
    cy.get('[data-cy="habitat-type-dropdown"]').should("not.exist");

    // Open the Broad Habitat dropdown
    cy.get('[data-cy="broad-habitat-dropdown"]').click();

    // Now find and click the 'Cropland' option in the full DOM body (React Select menu is portaled)
    cy.get("body").find(".react-select__option").contains("Cropland").click();

    // Check the Habitat Type label appears
    cy.get('[data-cy="habitat-type-dropdown"]').should("exist");
  });
});
import { hotelItem } from "@/interface";

describe("template spec", () => {
  it("Should fetch hotels and display", () => {
    cy.intercept({ method: "GET", url: "https://hotel-reservation-api-phi.vercel.app/api/v1/hotels" }, req => {
      delete req.headers["if-none-match"];
    }).as("getHotels");

    cy.visit("/");
    cy.get("a[href='/hotel']").should("exist");
    cy.get("a[href='/hotel']").click();

    var hotels: hotelItem[] = [];

    cy.wait(2000);
    cy.wait("@getHotels")
      .should(({ request, response }) => {
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.data).be.not.null;
        expect(response?.body.data).to.have.length(response?.body.count);
        hotels = response?.body.data;
      })
      .then(() => {
        hotels.forEach(hotel => {
          cy.contains(hotel.name).should("be.visible");
        });
      });
  });
});

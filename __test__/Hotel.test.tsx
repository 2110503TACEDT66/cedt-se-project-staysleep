import hotelCatalog from "@/components/HotelCatalog";
import { hotelJson } from "@/interface";
import { render, screen, waitFor } from "@testing-library/react";

const mockResult: hotelJson = {
  success: true,
  count: 2,
  data: [
    {
      _id: "66026dd5078c681403eb908b",
      name: "Luxury Haven Hotel",
      address: "123 Main Street",
      district: "Downtown",
      province: "Metropolis",
      postalcode: "12345",
      tel: "123-456-7890",
      picture: "https://drive.google.com/uc?id=1EE2EyFekFH1Q6XS6-_mauqpbOEu_yfP0",
      __v: 0,
      rooms: [
        {
          _id: "660280097ddfe00baa6d290f",
          roomNumber: "105",
          price: 2000,
          maxOccupant: 3,
          hotel: "66026dd5078c681403eb908b",
          picture: "https://drive.google.com/uc?id=1DO15cTXk8ki3FH5wA79aPJ-cph6wLzBK",
          __v: 0,
          bookings: [
            {
              _id: "66028c5e85e5ccd54d5e03b7",
              bookingbegin: "2024-03-26T00:00:00.000Z",
              bookingend: "2024-03-26T00:00:00.000Z",
              room: "660280097ddfe00baa6d290f",
            },
            {
              _id: "6602bf176768cb8dc6edc3a0",
              bookingbegin: "2024-03-30T00:00:00.000Z",
              bookingend: "2024-04-01T00:00:00.000Z",
              room: "660280097ddfe00baa6d290f",
            },
          ],
          id: "660280097ddfe00baa6d290f",
        },
      ],
      id: "66026dd5078c681403eb908b",
    },
    {
      _id: "66026e2b078c681403eb9091",
      name: "Mountain View Lodge",
      address: "789 Summit Road",
      district: "Hillside",
      province: "Mountaintop",
      postalcode: "67890",
      tel: "555-123-4567",
      picture: "https://drive.google.com/uc?id=1GuglKd-_jZbu9c0l_U-m36LwNJHlG2wX",
      __v: 0,
      rooms: [
        {
          _id: "66026f5e10fea35e85ebd4f2",
          roomNumber: "200",
          price: 1500,
          maxOccupant: 2,
          hotel: "66026e2b078c681403eb9091",
          picture: "https://drive.google.com/uc?id=1DO15cTXk8ki3FH5wA79aPJ-cph6wLzBK",
          __v: 0,
          bookings: [],
          id: "66026f5e10fea35e85ebd4f2",
        },
      ],
      id: "66026e2b078c681403eb9091",
    },
  ],
};

describe("Hotel Catalog", () => {
  it("should have correct number of hotel images", async () => {
    const HotelCatalog = await hotelCatalog({ hotelJson: mockResult });
    render(HotelCatalog);

    await waitFor(() => {
      const hotelImages = screen.getAllByRole("img");
      console.log(hotelImages.length);
      expect(hotelImages).toHaveLength(2);
    });
  });
});

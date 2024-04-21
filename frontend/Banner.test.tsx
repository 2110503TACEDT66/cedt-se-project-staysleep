import { render, screen } from "@testing-library/react";
import Banner from "@/components/Banner";
import userEvent from "@testing-library/user-event";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

// Mock useSession
jest.mock("next-auth/react", () => ({
  useSession() {
    return { data: null, user: { name: "Tester" } };
  },
}));

describe("Banner", () => {
  it("should have top bannertitle", () => {
    render(<Banner />);
    const bannerText = screen.getByText("Hotel Service Center");
    expect(bannerText).toBeInTheDocument();
  });

  it("should have sub bannertitle", () => {
    render(<Banner />);
    const bannerText = screen.getByText("Booking Hotel With Us");
    expect(bannerText).toBeInTheDocument();
  });

  const covers = ["cover.jpg", "cover1.jpg", "cover2.jpg", "cover3.jpg"];

  it("should change image on click", async () => {
    render(<Banner />);
    const banner = screen.getByRole("img") as HTMLImageElement;

    for (let i = 0; i < covers.length; i++) {
      await userEvent.click(banner);
      expect(banner.src).toContain(covers[(i + 1) % covers.length]);
    }
  });

  it("should have select hotel button", () => {
    render(<Banner />);
    const selectHotelButton = screen.getByRole("button", {
      name: "Select Hotel",
    });
    expect(selectHotelButton).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  describe("positive", () => {
    it("renders the wordmark", () => {
      render(<Header />);
      expect(screen.getByText("fetch-rosetta")).toBeInTheDocument();
    });

    it("shows the SDK wiring badge with name and version", () => {
      render(<Header />);
      expect(
        screen.getByText(/SDK wired: @fetch-rosetta\/sdk v\d+\.\d+\.\d+/),
      ).toBeInTheDocument();
    });

    it("renders as a banner landmark", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("forwards className and arbitrary props to the header", () => {
      render(<Header className="custom-class" data-testid="site-header" />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("custom-class");
      expect(header).toHaveAttribute("data-testid", "site-header");
    });
  });

  describe("negative", () => {
    it("does not render a level-1 heading (avoids clashing with the Hero)", () => {
      render(<Header />);
      expect(
        screen.queryByRole("heading", { level: 1 }),
      ).not.toBeInTheDocument();
    });

    it("renders no heading at all", () => {
      render(<Header />);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fetch Rosetta" }),
    ).toBeInTheDocument();
  });

  it("shows the SDK wiring badge", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/SDK wired: @fetch-rosetta\/sdk/),
    ).toBeInTheDocument();
  });

  it("renders the UI kit showcase tab by default", () => {
    render(<HomePage />);
    expect(screen.getByText("Component showcase")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Showcase } from "./Showcase";

describe("Showcase", () => {
  describe("positive", () => {
    it("shows the UI Kit tab content by default", () => {
      render(<Showcase />);
      expect(screen.getByText("Component showcase")).toBeInTheDocument();
    });

    it("reveals the About panel after selecting its tab", () => {
      render(<Showcase />);

      fireEvent.click(screen.getByRole("tab", { name: "About" }));

      expect(screen.getByText("Why a shared kit?")).toBeInTheDocument();
    });

    it("forwards className to the wrapper", () => {
      const { container } = render(<Showcase className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("negative", () => {
    it("does not show the About panel initially", () => {
      render(<Showcase />);
      expect(screen.queryByText("Why a shared kit?")).not.toBeInTheDocument();
    });

    it("hides the UI Kit panel once the About tab is active", () => {
      render(<Showcase />);

      fireEvent.click(screen.getByRole("tab", { name: "About" }));

      expect(screen.queryByText("Component showcase")).not.toBeInTheDocument();
    });
  });
});

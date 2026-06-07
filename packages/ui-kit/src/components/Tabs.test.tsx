import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

function renderTabs(onValueChange?: (value: string) => void) {
  return render(
    <Tabs defaultValue="one" onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("shows only the default tab's panel initially", () => {
    renderTabs();
    expect(screen.getByText("First panel")).toBeInTheDocument();
    expect(screen.queryByText("Second panel")).not.toBeInTheDocument();
  });

  it("switches panels on trigger click and notifies", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderTabs(onValueChange);

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByText("Second panel")).toBeInTheDocument();
    expect(screen.queryByText("First panel")).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith("two");
  });

  it("exposes correct ARIA selection state", async () => {
    const user = userEvent.setup();
    renderTabs();

    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("throws when a trigger is used outside <Tabs>", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<TabsTrigger value="x">X</TabsTrigger>)).toThrow(
      "<TabsTrigger> must be used inside <Tabs>",
    );
    spy.mockRestore();
  });
});

import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Without `globals: true`, Testing Library's auto-cleanup doesn't register —
// do it explicitly so renders don't leak between tests.
afterEach(() => {
  cleanup();
});

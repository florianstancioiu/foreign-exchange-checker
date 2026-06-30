# How to setup Vitest + React Testing Library in a TypeScript project

1. Run `npm install -d vitest jsdom @types/react @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event`
2. Create `setupTest.ts` with the following content

```ts
import "@testing-library/jest-dom";
```

3. Create `vitest.config.ts` with the following content

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
  },
});
```

4. Update "types" in `tsconfig.app.json` like this `"types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`

5. Add a new "test" entry in the scripts section of `package.json`:

```ts
{
  ...
  "scripts": {
    ...
    "test": "vitest"
  },
}
```

6. Write the tests for your React components and run the command `npm run test` to execute them.

import { defineConfig } from "orval";

export default defineConfig({
  fakestore: {
    input: {
      target: "./api/fakestore-openapi.yaml",
    },
    output: {
      target: "./src/shared/api/generated/fakestore.ts",
      client: "react-query",
      baseUrl: "https://fakestoreapi.com",
      mode: "single",
      override: {
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
});


import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/graph/schema",
  documents: "app/**/*.{tsx,ts}",
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;

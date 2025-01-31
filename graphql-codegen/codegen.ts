import type { CodegenConfig } from '@graphql-codegen/cli';

import { proxy as API_URL } from '../package.json';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${API_URL}/graphql`,
  generates: {
    'schema/schema.json': {
      plugins: ['introspection'],
      config: {
        minify: false,
      },
    },
    'schema/schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/apollo/possibleTypes.json': {
      plugins: ['fragment-matcher'],
    },
  },
  config: {
    namingConvention: 'keep',
    apolloClientVersion: 3,
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

// eslint-disable-next-line import/no-default-export
export default config;

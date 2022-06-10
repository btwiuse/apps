// Copyright 2017-2022 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Snippet } from '@polkadot/app-js/types';

// We must fix this :(
/* eslint-disable sort-keys */

export const metadataVersion: Snippet = {
  value: 'metadataVersion',
  text: 'Get metadata version',
  label: { color: 'green', children: 'Metadata', size: 'tiny' },
  code: `// Get node api metadata version

const metadataVersion = api.runtimeMetadata.version

console.log('Api metadata version: ' + metadataVersion);`
};

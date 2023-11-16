// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Route, TFunction } from './types.js';

import Component from '@polkadot/app-js';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'console',
    icon: 'code',
    name: 'playground',
    text: t('nav.js', 'Playground', { ns: 'apps-routing' })
  };
}

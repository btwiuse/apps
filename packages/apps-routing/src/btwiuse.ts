// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Route, TFunction } from './types.js';

import Component from '@polkadot/app-btwiuse';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'console',
    icon: 'terminal',
    name: 'console',
    text: t('nav.btwiuse', 'Console', { ns: 'apps-routing' })
  };
}

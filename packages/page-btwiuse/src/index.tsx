// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useTranslation } from './translate';
import { HelpOverlay, Tabs } from '@polkadot/react-components';
import { Route, Switch } from 'react-router';
import consts from './consts.md';
import { useApi } from '@polkadot/react-hooks';

import Console from "./Console";

interface Props {
  basePath: string;
  className?: string;
}

const Style = {
  left: '0',
  right: '0',
  bottom: '0',
  top: '0',
  width: '100%',
  height: '100%',
};

const hiddenStyle = {
  display: 'none',
};

function BtwiuseApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const { uuid } = useApi();

  console.log(uuid);

  const items = [
    {
      isRoot: true,
      name: 'console',
      text: t<string>('Deno (patched)')
    },
    {
      name: 'node',
      text: t<string>('Node.js')
    },
  ];

  return (
    <main className={className} style={{...Style, position: 'absolute'}}>
      <HelpOverlay md={consts as string} />
      <Switch>
        <Route path={`${basePath}/node`}>
          <Console idName="btwiuse-node" style={Style} sessionId={uuid} />
        </Route>
        <Route>
          <Console idName="btwiuse-deno" style={Style} sessionId={uuid} isDeno/>
        </Route>
      </Switch>
      <div style={hiddenStyle}>
      <Tabs
        basePath={basePath}
        hidden={[]}
        items={items}
      />
      </div>
    </main>
  );
}

export default React.memo(BtwiuseApp);

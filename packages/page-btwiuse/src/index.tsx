// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useTranslation } from './translate';
import { HelpOverlay, Tabs } from '@polkadot/react-components';
import { Route, Switch } from 'react-router';

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

const md = `# TODO

- integrate docgen tool and render here: https://github.com/polkadot-js/api/blob/master/packages/typegen/src/metadataMd.ts
`;

function BtwiuseApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const items = [
    {
      isRoot: true,
      name: 'console',
      text: t<string>('Node.js')
    },
    {
      name: 'deno',
      text: t<string>('Deno (Experimental)')
    },
  ];

  return (
    <main className={className} style={{...Style, position: 'absolute'}}>
      <HelpOverlay md={md as string} />
      <Switch>
        <Route path={`${basePath}/deno`}>
          <Console idName="btwiuse-deno" style={Style} isDeno/>
        </Route>
        <Route>
          <Console idName="btwiuse-console" style={Style}/>
        </Route>
      </Switch>
      <Tabs
        basePath={basePath}
        hidden={[]}
        items={items}
      />
    </main>
  );
}

export default React.memo(BtwiuseApp);

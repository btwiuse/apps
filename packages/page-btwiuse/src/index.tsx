// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTranslation } from './translate.js';
import { Tabs } from '@polkadot/react-components';
import { Route } from 'react-router';
// import consts from './consts.md';
import { useApi } from '@polkadot/react-hooks';

import Console from "./Console.js";
import AccountSelector from "./AccountSelector.js";

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

const DefaultQueryClient = new QueryClient()

function BtwiuseApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const { uuid } = useApi();

  return (
    <main className={className} style={{...Style, position: 'absolute'}}>
      <QueryClientProvider client={DefaultQueryClient}>
	<Console idName="terminal" style={Style} sessionId={uuid} isDeno/>
	<AccountSelector />
      </QueryClientProvider>
    </main>
  );
}

export default React.memo(BtwiuseApp);

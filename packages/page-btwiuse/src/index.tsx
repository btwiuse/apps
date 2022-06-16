// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from "react";
import { Route, Switch } from "react-router";

import { Tabs } from "@polkadot/react-components";

import Console from "./Console";
import Default from "./Default";
import Endpoints from "./Endpoints";
import Hash from "./Hash";

import { useTranslation } from "./translate";

interface Props {
  basePath: string;
  className?: string;
}

function BtwiuseApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: "console",
      text: t<string>("Console"),
    },
    {
      name: "btwiuse",
      text: t<string>("Btwiuse"),
    },
    {
      name: "arch",
      text: t<string>("Arch"),
    },
    {
      name: "endpoints",
      text: t<string>("Endpoints"),
    },
    {
      name: "gentoo",
      text: t<string>("Gentoo"),
    },
  ]);

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={tabsRef.current}
      />
      <Switch>
        <Route path={`${basePath}/endpoints`}>
          <Endpoints custom />
        </Route>
        <Route path={`${basePath}/arch`}>
          <Hash />
        </Route>
        <Route path={`${basePath}/gentoo`}>
          <Hash />
        </Route>
        <Route path={`${basePath}/console`}>
          <Default />
        </Route>
        <Route>
          <Console />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(BtwiuseApp);

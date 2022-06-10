// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from "react";
import { Route, Switch } from "react-router";

import { Tabs } from "@polkadot/react-components";

import Hash from "./Hash";
import Default from "./Default";
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
      name: "btwiuse",
      text: t<string>("Btwiuse"),
    },
    {
      name: "arch",
      text: t<string>("Arch"),
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
        <Route path={`${basePath}/arch`}>
          <Hash />
        </Route>
        <Route path={`${basePath}/gentoo`}>
          <Hash />
        </Route>
        <Route>
          <Default />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(BtwiuseApp);

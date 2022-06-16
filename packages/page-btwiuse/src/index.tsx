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
  ]);

  const style = {
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    width: '100%',
    height: '100%',
    position: 'absolute',
  };

  return (
    <main className={className}>
      <Console idName="btwiuse-console" style={style}/>
    </main>
  );
}

export default React.memo(BtwiuseApp);

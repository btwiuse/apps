// Copyright 2017-2022 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Routes } from '@polkadot/apps-routing/types';
import type { Group, Groups, ItemRoute } from './types';

import React, { useMemo, useRef, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import createRoutes from '@polkadot/apps-routing';

import { useTranslation } from '../translate';
import ChainInfo from './ChainInfo';
import Grouping from './Grouping';
import Item from './Item';

interface Props {
  className?: string;
}

function createExternals (t: TFunction): ItemRoute[] {
  return [
    {
      href: 'https://github.com/btwiuse/subshell',
      icon: 'code-branch',
      name: 'github',
      text: t<string>('nav.github', 'GitHub', { ns: 'apps-routing' })
    },
    {
      href: 'https://github.com/btwiuse/subshell/wiki',
      icon: 'book',
      name: 'wiki',
      text: t<string>('nav.wiki', 'Wiki', { ns: 'apps-routing' })
    }
  ];
}

function extractGroups (routing: Routes, groupNames: Record<string, string>): Group[] {
  return Object
    .values(
      routing.reduce((all: Groups, route): Groups => {
        if (!all[route.group]) {
          all[route.group] = {
            name: groupNames[route.group],
            routes: [route]
          };
        } else {
          all[route.group].routes.push(route);
        }

        return all;
      }, {})
    )
    .map(({ name, routes }): Group => ({
      name,
      routes,
    }))
    .filter(({ routes }) => routes.length);
}

function Menu ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const location = useLocation();

  const externalRef = useRef(createExternals(t));
  const routeRef = useRef(createRoutes(t));

  const groupRef = useRef({
    accounts: t('Accounts'),
    btwiuse: t('Btwiuse'),
    console: t('Console'),
    subshell: t('SubShell'),
    developer: t('Developer'),
    files: t('Files'),
    governance: t('Governance'),
    network: t('Network'),
    settings: t('Settings')
  });

  const visibleGroups = useMemo(
    () => extractGroups(routeRef.current, groupRef.current),
    []
  );

  const activeRoute = useMemo(
    () => routeRef.current.find(({ name }) =>
      location.pathname.startsWith(`/${name}`)
    ) || null,
    [location]
  );

  return (
    <div className={`${className} highlight--bg`}>
      <div className='menuContainer'>
        <div className='menuSection'>
          <Suspense fallback={<p>Loading</p>}>
            <ChainInfo />
          </Suspense>
          <ul className='menuItems'>
            {visibleGroups.map(({ name, routes }): React.ReactNode => (
              <Grouping
                isActive={activeRoute && activeRoute.group === name.toLowerCase()}
                key={name}
                name={name}
                routes={routes}
              />
            ))}
          </ul>
        </div>
        <div className='menuSection media--700'>
          <ul className='menuItems'>
            {externalRef.current.map((route): React.ReactNode => (
              <Item
                isLink
                isToplevel
                key={route.name}
                route={route}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Menu)`
  width: 100%;
  padding: 0;
  z-index: 220;
  position: relative;

  & .menuContainer {
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    width: 100%;
    max-width: var(--width-full);
    margin: 0 auto;
  }

  &.isLoading {
    background: #999 !important;

    .menuActive {
      background: var(--bg-page);
    }

    &:before {
      filter: grayscale(1);
    }

    .menuItems {
      filter: grayscale(1);
    }
  }

  .menuSection {
    align-items: center;
    display: flex;
  }

  .menuActive {
    background: var(--bg-tabs);
    border-bottom: none;
    border-radius: 0.25rem 0.25rem 0 0;
    color: var(--color-text);
    padding: 1rem 1.5rem;
    margin: 0 1rem -1px;
    z-index: 1;

    .ui--Icon {
      margin-right: 0.5rem;
    }
  }

  .menuItems {
    flex: 1 1;
    list-style: none;
    margin: 0 1rem 0 0;
    padding: 0;

    > li {
      display: inline-block;
    }

    > li + li {
      margin-left: 0.375rem
    }
  }

  .ui--NodeInfo {
    align-self: center;
  }

`);

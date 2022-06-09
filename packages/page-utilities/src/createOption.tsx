// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/apps-config/settings/types';

import React from 'react';

import { ChainImg, Dropdown } from '@polkadot/react-components';

export function createOption ({ info, isHeader, text, value }: Option, overrides: string[] = [], override = 'empty', extra?: string): Option | React.ReactNode {
  if (isHeader) {
    return (
      <Dropdown.Header
        content={text}
        key={text as string}
      />
    );
  }

  return {
    text: (
      <div
        className='ui--Dropdown-item'
        key={value}
      >
        <ChainImg
          className='ui--Dropdown-icon'
          logo={
            info && overrides.includes(info)
              ? override
              : info
          }
        />
        <div className='ui--Dropdown-name'>{text}{extra}</div>
      </div>
    ),
    value
  };
}

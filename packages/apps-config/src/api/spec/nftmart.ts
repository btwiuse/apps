// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

// structs need to be in order
/* eslint-disable sort-keys */
/* eslint-disable camelcase */

import { OverrideBundleDefinition } from '@polkadot/types/types';

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        CategoryData: {
          metadata: 'NFTMetadata',
          nftCount: 'Balance'
        },
        CategoryId: 'u32',
        CategoryIdOf: 'CategoryId',
        ClassId: 'u32',
        TokenId: 'u64',
        CurrencyId: 'u32',
        CurrencyIdOf: 'CurrencyId',
        Amount: 'i128',
        AmountOf: 'Amount',
        NFTMetadata: 'Vec<u8>',
        ClassIdOf: 'ClassId',
        TokenIdOf: 'TokenId',
        ClassInfoOf: { metadata: 'NFTMetadata', totalIssuance: 'TokenId', owner: 'AccountId', data: 'ClassData' },
        TokenInfoOf: { metadata: 'NFTMetadata', owner: 'AccountId', data: 'TokenData' },
        ClassData: { deposit: 'Balance', properties: 'Properties', name: 'Vec<u8>', description: 'Vec<u8>' },
        TokenData: { deposit: 'Balance' },
        Properties: 'u8'
      }
    }
  ]
};

export default definitions;

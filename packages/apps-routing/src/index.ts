// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Routes } from './types';

//import accounts from './accounts';
import settings from './settings';
//import treasury from './treasury';
//import claims from './claims';
//import utilities from './utilities';
import btwiuse from './btwiuse';
//import js from './js';

/*
import addresses from './addresses';
import assets from './assets';
import bounties from './bounties';
import calendar from './calendar';
import collator from './collator';
import contracts from './contracts';
import council from './council';
import democracy from './democracy';
import explorer from './explorer';
import extrinsics from './extrinsics';
import files from './files';
import gilt from './gilt';
//import membership from './membership';
import nfts from './nfts';
import parachains from './parachains';
import poll from './poll';
import rpc from './rpc';
import signing from './signing';
import society from './society';
import staking from './staking';
import storage from './storage';
import sudo from './sudo';
import techcomm from './techcomm';
import teleport from './teleport';
import transfer from './transfer';
*/

export default function create (t: TFunction): Routes {
  return [
    //accounts(t),
    //treasury(t),
    //claims(t),
    btwiuse(t),
    //utilities(t),
    settings(t),
    //js(t),
  ]
  /*
  return [
    addresses(t),
    explorer(t),
    poll(t),
    transfer(t),
    teleport(t),
    staking(t),
    collator(t),
    democracy(t),
    council(t),
    bounties(t),
    techcomm(t),
    //membership(t),
    parachains(t),
    gilt(t),
    assets(t),
    nfts(t),
    society(t),
    calendar(t),
    contracts(t),
    storage(t),
    extrinsics(t),
    rpc(t),
    signing(t),
    sudo(t),
    files(t),
  ];
  */
}

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { selectableNetworks } from '@axia-js/networks';
import { assert } from '@axia-js/util';

function getGenesis (name: string): string {
  const network = selectableNetworks.find(({ network }) => network === name);

  assert(network && network.genesisHash[0], `Unable to find genesisHash for ${name}`);

  return network.genesisHash[0];
}




export const KULUPU_GENESIS = getGenesis('kulupu');

export const AXIALUNAR_GENESIS = getGenesis('axialunar');

export const AXIA_GENESIS = getGenesis('axia');
export const AXIA_DENOM_BLOCK = new BN(1248328);

export const BETANET_GENESIS = '0x5fce687da39305dfe682b117f0820b319348e8bb37eb16cf34acbf6a202de9d9';

export const ALPHANET_GENESIS = '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e';

export const NEATCOIN_GENESIS = '0xfbb541421d30423c9a753ffa844b64fd44d823f513bf49e3b73b3a656309a595';

// Copyright 2017-2021 @axia-js/test-supports authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll, DeriveStakingAccount } from '@axia-js/api-derive/types';
import { UseAccountInfo } from '@axia-js/react-hooks/types';
import { KeyringJson$Meta } from '@axia-js/ui-keyring/types';

import { AccountOverrides, Override } from '../types';

export const anAccount = (): AccountOverrides => ({});

export const anAccountWithBalance = (balance: Override<DeriveBalancesAll>): AccountOverrides => ({
  balance
});

export const anAccountWithBalanceAndMeta = (balance: Override<DeriveBalancesAll>, meta: Override<KeyringJson$Meta>): AccountOverrides => ({
  balance,
  meta
});

export const anAccountWithInfo = (info: Override<UseAccountInfo>): AccountOverrides => ({
  info
});

export const anAccountWithMeta = (meta: Override<KeyringJson$Meta>): AccountOverrides => ({
  meta
});

export const anAccountWithStaking = (staking: Override<DeriveStakingAccount>): AccountOverrides => ({
  staking
});

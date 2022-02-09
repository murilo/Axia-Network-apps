// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveBalancesAll } from '@axia-js/api-derive/types';
import type { AccountId, AccountIndex, Address } from '@axia-js/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function BalanceDisplay ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const allBalances = useCall<DeriveBalancesAll>(api.derive.balances?.all, [params]);

  return (
    <FormatBalance
      className={className}
      label={label}
      value={allBalances?.freeBalance}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(BalanceDisplay);

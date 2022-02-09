// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { Call } from '@axia-js/types/interfaces';

import { useEffect, useState } from 'react';

import { BN_ZERO, isFunction } from '@axia-js/util';

import { useApi } from './useApi';
import { useIsMountedRef } from './useIsMountedRef';

// a random address that we are using for our queries
const ZERO_ACCOUNT = '5CAUdnwecHGxxyr5vABevAfZ34Fi4AaraDRMwfDQXQ52PXqg';
const EMPTY_STATE: [BN, number] = [BN_ZERO, 0];

// for a given call, calculate the weight
export function useWeight (call?: Call | null): [BN, number] {
  const { api } = useApi();
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY_STATE);

  useEffect((): void => {
    if (call && isFunction(api.rpc.payment?.queryInfo)) {
      api.tx(call)
        .paymentInfo(ZERO_ACCOUNT)
        .then(({ weight }) => mountedRef.current && setState([weight, call.encodedLength]))
        .catch(console.error);
    } else {
      setState(EMPTY_STATE);
    }
  }, [api, call, mountedRef]);

  return state;
}

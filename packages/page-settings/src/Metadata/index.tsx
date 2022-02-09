// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { useApi } from '@axia-js/react-hooks';

import useChainInfo from '../useChainInfo';
import Extensions from './Extensions';
import NetworkSpecs from './NetworkSpecs';

export default function Metadata (): React.ReactElement {
  const { isDevelopment } = useApi();
  const chainInfo = useChainInfo();

  return (
    <>
      {!isDevelopment && (
        <>
          <Extensions chainInfo={chainInfo} />
        </>
      )}
      <NetworkSpecs chainInfo={chainInfo} />
    </>
  );
}

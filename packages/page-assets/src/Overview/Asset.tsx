// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AssetInfo } from '../types';

import React, { useMemo } from 'react';

import { AddressSmall } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';

import Mint from './Mint';

interface Props {
  className?: string;
  value: AssetInfo;
}

function Asset ({ className, value: { details, id, isIssuerMe, metadata } }: Props): React.ReactElement<Props> {
  const format = useMemo(
    () => metadata
      ? [metadata.decimals.toNumber(), metadata.symbol.toUtf8()]
      : [0, '---'],
    [metadata]
  );

  return (
    <tr className={className}>
      <td className='number'><h1>{formatNumber(id)}</h1></td>
      <td className='together'>{metadata?.name.toUtf8()}</td>
      <td className='address media--1000'>{details && <AddressSmall value={details.owner} />}</td>
      <td className='address media--1200'>{details && <AddressSmall value={details.admin} />}</td>
      <td className='address media--1300'>{details && <AddressSmall value={details.issuer} />}</td>
      <td className='address media--1400'>{details && <AddressSmall value={details.freezer} />}</td>
      <td className='number all'>{details && (
        <FormatBalance
          format={format}
          value={details.supply}
        />
      )}</td>
      <td className='button'>{details && metadata && isIssuerMe && (
        <Mint
          details={details}
          id={id}
          metadata={metadata}
        />
      )}</td>
    </tr>
  );
}

export default React.memo(Asset);

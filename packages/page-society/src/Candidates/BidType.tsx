// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BidKind } from '@axia-js/types/interfaces';

import React, { useMemo } from 'react';

import { AddressSmall } from '@axia-js/react-components';

interface Props {
  value?: BidKind;
}

function BidType ({ value }: Props): React.ReactElement<Props> {
  const vouchId = useMemo(
    () => value?.isVouch
      ? value.asVouch[0]
      : null,
    [value]
  );

  return (
    <>
      <td className='no-pad-right'>{value && value.type}</td>
      <td>{vouchId && <AddressSmall value={vouchId} />}</td>
    </>
  );
}

export default React.memo(BidType);

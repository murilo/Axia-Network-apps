// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ActiveGiltsTotal } from '@axia-js/types/interfaces';

import BN from 'bn.js';
import React from 'react';

import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber } from '@axia-js/react-hooks';
import { BN_HUNDRED, BN_QUINTILL, formatNumber } from '@axia-js/util';

import { useTranslation } from '../translate';

interface Props {
  activeTotal?: ActiveGiltsTotal;
  className?: string;
  isDisabled: boolean;
}

const DIVIDOR_NU = 10_000;
const DIVISOR_BN = new BN(10_000);

function Summary ({ activeTotal, className, isDisabled }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const bestNumber = useBestNumber();

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary label={t<string>('active')}>
          {isDisabled ? t('no') : t('yes')}
        </CardSummary>
        {activeTotal && (
          <CardSummary label={t<string>('index')}>
            {formatNumber(activeTotal.index)}
          </CardSummary>
        )}
      </section>
      {activeTotal && (
        <section>
          <CardSummary label={t<string>('proportion')}>
            {(activeTotal.proportion.mul(DIVISOR_BN).imul(BN_HUNDRED).div(BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2)}%
          </CardSummary>
          <CardSummary label={t<string>('target')}>
            {(activeTotal.target.mul(DIVISOR_BN).imul(BN_HUNDRED).div(BN_QUINTILL).toNumber() / DIVIDOR_NU).toFixed(2)}%
          </CardSummary>
        </section>
      )}
      <section>
        {bestNumber && (
          <CardSummary
            label={t<string>('intake')}
            progress={{
              total: api.consts.gilt.intakePeriod,
              value: bestNumber.mod(api.consts.gilt.intakePeriod),
              withTime: true
            }}
          />
        )}
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);

// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-gilt';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.gilt.placeBid',
        'query.proxy.proxies'
      ]
    },
    group: 'network',
    icon: 'leaf',
    name: 'gilt',
    text: t('nav.gilt', 'Gilt', { ns: 'apps-routing' })
  };
}

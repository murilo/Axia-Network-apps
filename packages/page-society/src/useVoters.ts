// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@axia-js/api';
import type { DeriveSocietyCandidate } from '@axia-js/api-derive/types';
import type { Voters } from './types';

import { useEffect, useState } from 'react';

import { useApi, useCall, useEventTrigger } from '@axia-js/react-hooks';

const EMPTY_VOTERS: Voters = {};

async function getVoters (api: ApiPromise, candidates: DeriveSocietyCandidate[]): Promise<Voters> {
  const skeptics: string[] = [];
  const voters: string[] = [];

  const entries = candidates.length
    ? await Promise.all(candidates.map(({ accountId }) =>
      api.query.society.votes.entries(accountId)
    ))
    : [];

  entries.forEach((list): void => {
    list.forEach(([{ args: [, accountId] }, opt]) => {
      if (opt.isSome) {
        const key = accountId.toString();
        const vote = opt.unwrap();

        if (vote.isSkeptic) {
          !skeptics.includes(key) && skeptics.push(key);
        } else {
          !voters.includes(key) && voters.push(key);
        }
      }
    });
  });

  return { candidates, skeptics, voters };
}

export default function useVoters (): Voters {
  const { api } = useApi();
  const voteTrigger = useEventTrigger([api.events.society.Vote]);
  const candidates = useCall<DeriveSocietyCandidate[]>(api.derive.society.candidates);
  const [state, setState] = useState<Voters>(EMPTY_VOTERS);

  useEffect((): void => {
    voteTrigger && candidates &&
      getVoters(api, candidates).then(setState).catch(console.error);
  }, [api, candidates, voteTrigger]);

  return state;
}

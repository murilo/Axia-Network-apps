// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@axia-js/types';
import type { AllychainProposal, ParaId } from '@axia-js/types/interfaces';
import type { ProposalExt, ScheduledProposals } from '../types';

import { useMemo } from 'react';

import { useApi, useCall } from '@axia-js/react-hooks';

export default function useProposal (id: ParaId, approvedIds: ParaId[], scheduled: ScheduledProposals[]): ProposalExt {
  const { api } = useApi();
  const opt = useCall<Option<AllychainProposal>>(api.query.proposeAllychain.proposals, [id]);

  return useMemo(
    (): ProposalExt => ({
      id,
      isApproved: approvedIds.some((a) => a.eq(id)),
      isScheduled: scheduled.some(({ scheduledIds }) => scheduledIds.some((s) => s.eq(id))),
      proposal: opt && opt.isSome
        ? opt.unwrap()
        : undefined
    }),
    [approvedIds, id, opt, scheduled]
  );
}

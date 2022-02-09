// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React, { useState } from 'react';

import { InputAddress, InputBalance, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  nextParaId?: BN;
  onClose: () => void;
}

function RegisterId ({ className, nextParaId, onClose }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);

  return (
    <Modal
      className={className}
      header={t<string>('Reserve ParaId')}
      onClose={onClose}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns hint={t<string>('This account will be used to the Id reservation and for the future parathread.')}>
          <InputAddress
            label={t<string>('reserve from')}
            onChange={setAccountId}
            type='account'
            value={accountId}
          />
        </Modal.Columns>
        <Modal.Columns hint={t<string>('The Id of this allychain as known on the network (selected from nextFreeId)')}>
          <InputNumber
            defaultValue={nextParaId}
            isDisabled
            label={t<string>('allychain id')}
          />
        </Modal.Columns>
        <Modal.Columns hint={t<string>('The reservation fee for this Id')}>
          <InputBalance
            defaultValue={api.consts.registrar.paraDeposit}
            isDisabled
            label={t<string>('reserved deposit')}
          />
        </Modal.Columns>
      </Modal.Content>
      <Modal.Actions>
        <TxButton
          accountId={accountId}
          icon='plus'
          isDisabled={!nextParaId}
          onStart={onClose}
          params={[]}
          tx={api.tx.registrar.reserve}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(RegisterId);

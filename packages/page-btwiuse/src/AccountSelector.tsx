// Copyright 2017-2022 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react";

import { Button, InputAddress, Modal } from "@polkadot/react-components";

import { useTranslation } from "./translate";
import { useApi } from "@polkadot/react-hooks";

let intervalId: ReturnType<typeof setInterval>;
let prevFocus: HTMLElement | null;

function SelectAccount() {
  const { t } = useTranslation();
  const [accountId, setAccountId] = useState<string | null>(null);
  // const [result, setResult] = useState<string | null>(null);
  const { agent } = useApi();

  const [isOpen, setOpen] = useState(agent.modalStatus.isOpen);

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(()=>{
    // console.log('open', agent.modalStatus.isOpen, intervalId)
    if (agent.modalStatus.isOpen && !isOpen) {
      prevFocus = document.activeElement as HTMLElement;
      console.log(prevFocus);
      setOpen(true);
    }
  }, 1000)

  /*
  const isOpen = useMemo(() => {
    return agent.modalStatus.isOpen;
  }, [agent.counter]);
  */

  const onSubmit = () => {
    // setResult('selected');
    console.log("chose", accountId);
    // toggleIsOpen();
    // _toggleIsOpen();
    setOpen(false);
    agent.modalStatus.setValue(accountId);
    agent.modalStatus.toggle();
    // restoreFocus()
    if (prevFocus) {
      prevFocus.focus()
      console.log(prevFocus)
    }
  };

  /*
  const restoreFocus = () => {
    let [xtermCursorElement] = document.getElementsByClassName('xterm-helper-textarea')
    if (xtermCursorElement) xtermCursorElement.focus()
  } */

  const onClose = () => {
    // setResult('close');
    setAccountId(null);
    console.log("close", accountId);
    // toggleIsOpen();
    // _toggleIsOpen();
    setOpen(false);
    agent.modalStatus.setValue(null);
    agent.modalStatus.toggle();
    // restoreFocus()
    if (prevFocus) {
      prevFocus.focus()
      console.log(prevFocus)
    }
  };

  const onClick = () => {
    console.log(agent.modalStatus.isOpen, agent.modalStatus.getValue());
    // _toggleIsOpen();
    agent.modalStatus.toggle();
    console.log(agent.counter, agent.isReady, agent.HEADER);
    // restoreFocus()
  };

  return (
    <div>
      {false && (
        <Button
          icon="plus"
          isDisabled={false}
          label={t<string>("Select")}
          onClick={onClick}
        />
      )}
      {isOpen && (
        <Modal
          className="ui--SelectAccountModal"
          header={t<string>("Select an account")}
          onClose={onClose}
        >
          <Modal.Content>
            <Modal.Columns
              hint={t<string>("This account will be chosen by Subshell.")}
            >
              <InputAddress
                isError={false}
                label={t<string>("select this account")}
                onChange={setAccountId}
                type="account"
                withLabel
              />
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon="plus"
              isDisabled={!accountId}
              label={t<string>("Submit")}
              onClick={onSubmit}
            />
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
}

export default React.memo(SelectAccount);

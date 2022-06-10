// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { HelpOverlay } from '@polkadot/react-components';

import Xterm from './Xterm';

interface Props {
  className?: string;
}

const helpMessage = `# btw i use arch

author: [@btwiuse](https://github.com/btwiuse)

oh arch

my love

you're the best distro in the world

how am i supposed to live without you!
`

function Default({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <HelpOverlay md={helpMessage} />
      <div className="ui--row">
        <p>bar</p>
      </div>
      <div className="ui--row">
        <p>baz</p>
      </div>
      <Xterm />
    </div>
  );
}

export default React.memo(Default);

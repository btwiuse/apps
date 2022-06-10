// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

interface Props {
  className?: string;
}

function Default({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <div className="ui--row">
        <p>foo</p>
      </div>
      <div className="ui--row">
        <p>bar</p>
      </div>
      <div className="ui--row">
        <p>baz</p>
      </div>
    </div>
  );
}

export default React.memo(Default);

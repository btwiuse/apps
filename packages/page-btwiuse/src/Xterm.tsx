// Copyright 2017-2022 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

// https://github.com/PrinOrange/web-terminal/blob/master/frontend/src/view/MyTerm.tsx

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import React, { useEffect } from "react";
import "xterm/css/xterm.css";

export default function Xterm() {
  const dom_id = "btwiuse-xterm";

  useEffect(() => {
    if (document.getElementById(dom_id)?.children.length === 0) {
      const term = new Terminal({
        fontFamily: "consolas",
        windowsMode: true,
        fontWeight: "bold",
        fontWeightBold: "bold",
      });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      window.onresize = () => {
        fitAddon.fit();
      };
      term.open(document.getElementById(dom_id)!);
      fitAddon.fit();
    //   term.write(" WebShell Terminal $ \n");
      term.write('\n')
      term.write("  _____  _      _        _        _    _                                     \r\n |_   _|| |__  (_) ___  (_) ___  | |_ | |__    ___                           \r\n   | |  | \'_ \\ | |/ __| | |/ __| | __|| \'_ \\  / _ \\                          \r\n   | |  | | | || |\\__ \\ | |\\__ \\ | |_ | | | ||  __/                          \r\n   |_|  |_| |_||_||___/ |_||___/  \\__||_| |_| \\___|                          \r\n __        __     _           _____                       _                _ \r\n \\ \\      / /___ | |__       |_   _|___  _ __  _ __ ___  (_) _ __    __ _ | |\r\n  \\ \\ /\\ / // _ \\| \'_ \\  _____ | | / _ \\| \'__|| \'_ ` _ \\ | || \'_ \\  / _` || |\r\n   \\ V  V /|  __/| |_) ||_____|| ||  __/| |   | | | | | || || | | || (_| || |\r\n    \\_/\\_/  \\___||_.__/        |_| \\___||_|   |_| |_| |_||_||_| |_| \\__,_||_|\r\n                                                                             ");
      term.onData((send) => term.write(send));
    }
  }, [dom_id]);

  return <div id={dom_id} />;
}

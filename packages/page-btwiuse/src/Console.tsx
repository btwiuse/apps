import React from "react";
import { useEffect } from "react";

import { Xterm } from "./wetty/xterm";
import { protocols, Terminal, WeTTY } from "./wetty/wetty";
import { TransportFactory } from "./wetty/transport";
import { settings } from '@polkadot/ui-settings';

import styled from "styled-components";
import "xterm/css/xterm.css";
import "./xterm_customize.css";

interface Props {
  className?: string;
  style?: any;
}

function Console({ className = "terminal", style }: Props) {
  const id = "undefined";
  const hub = "wss://subshell.herokuapp.com";

  useEffect(() => {
    const { apiUrl } = settings.get();
    const elem = document.getElementById(className);

    if (elem !== null) {
      // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
      // in React.StrictMode, Terminal got rendered twice on page load,
      // use this trick to maintain idempotency
      while (elem.childElementCount > 1) elem.removeChild(elem.childNodes[1]);

      // term (frontend)
      var term: Terminal;
      term = new Xterm(elem);
      term.setCmd(["subsh", "--provider", apiUrl]);
      term.setEnv({
        'USER_AGENT': window.navigator.userAgent,
      })

      window.onresize = () => {
	term.fit.fit();
      };
      term.fit.fit();

      // factory (websocket backend)
      // const httpsEnabled = window.location.protocol == "https:";
      const url = `${hub}/api/agent/${id}/terminal`;
      const factory = new TransportFactory(url, protocols);

      // wetty (hub)
      const wt = new WeTTY(term, factory);
      const closer = wt.open();

      window.addEventListener("unload", () => {
        closer();
        term.close();
      });
    }
  });

  return (
    <div id={className} style={style}></div>
  );
}

export default React.memo(
  styled(Console)(({ className = "terminal" }: Props) => `
`),
);

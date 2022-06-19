import React from "react";
import { useEffect } from "react";

import { Xterm } from "./wetty/xterm";
import { protocols, Terminal, WeTTY } from "./wetty/wetty";
import { TransportFactory } from "./wetty/transport";
import { settings } from '@polkadot/ui-settings';
import { decodeUrlTypes } from '@polkadot/react-api/urlTypes';
import store from 'store';

import styled from "styled-components";
import "xterm/css/xterm.css";
import "./xterm_customize.css";

interface Props {
  className?: string;
  style?: any;
}

function getDevTypes (): Record<string, Record<string, string>> {
  const types = decodeUrlTypes() || store.get('types', {}) as Record<string, Record<string, string>>;
  const names = Object.keys(types);

  names.length && console.log('Injected types:', names.join(', '));

  return types;
}

const HUB_WS_URL = process.env.HUB_WS_URL;
const SUBSH_CMD = process.env.SUBSH_CMD;

function Console({ className = "terminal", style }: Props) {
  const id = "undefined";

  useEffect(() => {
    const { apiUrl } = settings.get();
    const types = getDevTypes();
    const elem = document.getElementById(className);

    if (elem !== null) {
      // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
      // in React.StrictMode, Terminal got rendered twice on page load,
      // use this trick to maintain idempotency
      while (elem.childElementCount > 1) elem.removeChild(elem.childNodes[1]);

      // term (frontend)
      var term: Terminal;
      term = new Xterm(elem);
      term.setCmd(SUBSH_CMD);
      term.setEnv({
        'USER_AGENT': window.navigator.userAgent,
        'TYPES': JSON.stringify(types),
        'PROVIDER': apiUrl,
      })

      window.onresize = () => {
    	document.getElementById(className) && term.fit.fit();
      };
      term.fit.fit();

      // factory (websocket backend)
      // const httpsEnabled = window.location.protocol == "https:";
      const url = `${HUB_WS_URL}/api/agent/${id}/terminal`;
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

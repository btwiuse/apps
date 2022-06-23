import React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
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
  sessionId?: string;
  idName?: string;
  style?: any;
  isDeno?: boolean;
}

function getDevTypes (): Record<string, Record<string, string>> {
  const types = decodeUrlTypes() || store.get('types', {}) as Record<string, Record<string, string>>;
  const names = Object.keys(types);

  names.length && console.log('Injected types:', names.join(', '));

  return types;
}

const HUB_WS_URL = process.env.HUB_WS_URL!;
const SUBSH_CMD = JSON.parse(JSON.stringify(process.env.SUBSH_CMD));
const DENO_CMD = JSON.parse(JSON.stringify(process.env.DENO_CMD));

interface Agent {
  id: string;
}

function fetchAgentsWithCache() {
  let cache: Agent[] = [];
  return async () => {
    if (cache.length == 0) {
      let res = await fetch("https://www.k0s.io/api/agents/list?tags=Subshell");
      cache = await res.json();
    }
    return cache;
  }
}

function Console({ idName = "terminal", style, isDeno, sessionId }: Props) {
  const {data} = useQuery("agents", fetchAgentsWithCache());

  useEffect(() => {
    const { apiUrl } = settings.get();
    const types = getDevTypes();
    const elem = document.getElementById(idName);
    let id = "undefined";
    if (data && data.length > 0) {
      id = data[0].id;
    } else {
      return
    }

    if (elem == null) return;

    // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
    // in React.StrictMode, Terminal got rendered twice on page load,
    // use this trick to maintain idempotency
    while (elem.childElementCount > 0) elem.removeChild(elem.childNodes[0]);

    // term (frontend)
    var term: Terminal;
    term = new Xterm(elem);
    if (isDeno)
      term.setCmd(DENO_CMD);
    else
      term.setCmd(SUBSH_CMD);
    term.setEnv({
      'USER_AGENT': window.navigator.userAgent,
      'TYPES': JSON.stringify(types),
      'PROVIDER': apiUrl,
      'SESSION_ID': sessionId ?? '',
      'HUB': HUB_WS_URL,
    })

    term.fit.fit();
    term.focus();

    // factory (websocket backend)
    // const httpsEnabled = window.location.protocol == "https:";
    const url = `${HUB_WS_URL}/api/agent/${id}/terminal`;
    const factory = new TransportFactory(url, protocols);

    // wetty (hub)
    const wt = new WeTTY(term, factory);
    const closer = wt.open();

    // throttle resize events
    let doit: ReturnType<typeof setTimeout>;
    window.onresize = () => {
      if (doit) clearTimeout(doit);
      doit = setTimeout(()=>{
	if (document.getElementById(idName)) {
	  term.fit.fit()
	  console.log({
	    width: window.innerWidth,
	    height: window.innerHeight,
	  })
	}
      }, 200)
    };

    window.addEventListener("unload", () => {
      closer();
      term.close();
    });

    return () => {
      // Anything in here is fired on component unmount.
      term.mute()
      closer()
    }
  }, [data]);

  return (
    <div id={idName} style={style}></div>
  );
}

export default React.memo(
  styled(Console)(({ idName = "terminal" }: Props) => `
`),
);

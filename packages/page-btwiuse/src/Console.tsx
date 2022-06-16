import React, { createElement as h } from "react";
import { useEffect } from "react";

import { Xterm } from "./wetty/xterm";
import { protocols, Terminal, WeTTY } from "./wetty/wetty";
import { TransportFactory } from "./wetty/transport";

import "./xterm.css";
import "./xterm_customize.css";

import { Route, Routes, useParams } from "react-router-dom";
import { useHub } from "./HubContext";

interface Props {
  className?: string;
}

export default function Terminal({ className = "" }: Props) {
  const { id } = useParams();
  const { hub } = useHub();

  useEffect(() => {
    const elem = document.getElementById("terminal");

    if (elem !== null) {
      // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
      // in React.StrictMode, Terminal got rendered twice on page load,
      // use this trick to maintain idempotency
      while (elem.childElementCount > 1) elem.removeChild(elem.childNodes[1]);

      // term (frontend)
      var term: Terminal;
      term = new Xterm(elem);

      // factory (websocket backend)
      const httpsEnabled = window.location.protocol == "https:";
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
  }, [id, hub]);

  return (
    <div id="terminal">
      <h1>Terminal (id: {id})</h1>
    </div>
  );
}

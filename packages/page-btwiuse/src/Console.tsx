import React from "react";
import { useEffect } from "react";

import { Xterm } from "./wetty/xterm";
import { protocols, Terminal, WeTTY } from "./wetty/wetty";
import { TransportFactory } from "./wetty/transport";

//import "./xterm.css";
import "./xterm_customize.css";

import styled from "styled-components";
import "xterm/css/xterm.css";

interface Props {
  className?: string;
  style?: any;
}

function Console({ className = "terminal", style }: Props) {
  const id = "undefined";
  const hub = "wss://subshell.herokuapp.com";

  useEffect(() => {
    const elem = document.getElementById(className);

    if (elem !== null) {
      // https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
      // in React.StrictMode, Terminal got rendered twice on page load,
      // use this trick to maintain idempotency
      while (elem.childElementCount > 1) elem.removeChild(elem.childNodes[1]);

      // term (frontend)
      var term: Terminal;
      term = new Xterm(elem);

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
.xterm {
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm .xterm-scroll-area {
    visibility: hidden;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm {
    cursor: text;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility,
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    opacity: 0.5;
}

.xterm-underline {
    text-decoration: underline;
}

.xterm-strikethrough {
    text-decoration: line-through;
}

.xterm-screen .xterm-decoration-container .xterm-decoration {
	z-index: 6;
	position: absolute;
}

.${className} {
    font-family: "DejaVu Sans Mono", "Everson Mono", FreeMono, Menlo, Terminal, monospace, "Apple Symbols";
}

.xterm-overlay {
    font-family: "DejaVu Sans Mono", "Everson Mono", FreeMono, Menlo, Terminal, monospace, "Apple Symbols";
    border-radius: 15px;
    font-size: xx-large;
    color: black;
    background: white;
    opacity: 0.75;
    padding: 0.2em 0.5em 0.2em 0.5em;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    transition: opacity 180ms ease-in;
}
`),
);

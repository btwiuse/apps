// Copyright 2017-2022 @polkadot/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { web3Accounts, web3FromAddress } from "@polkadot/extension-dapp";
import type { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types';
import type { SignerResult } from '@polkadot/api/types';
// import {encodeAddress} from "@polkadot/util-crypto"
// web3Enable("polkadot-js/apps");

const META = {
  "os": "web",
  "pwd": window.location?.pathname || "/dev/null",
  "arch": "js",
  "distro": "js",
  "username": "webuser",
  "hostname": window.location?.hostname || "unknown",
};

const VERSION = {
  "GitCommit": "e040989acfeeebcbab79b1825222df08138c749b",
  "GitState": "dirty",
  "GitBranch": "master",
  "GitSummary": "release-75-20220614-5-ge040989ac-dirty",
  "BuildDate": "2022-06-20T05:31:29Z",
  "Version": "v0.0.15",
  "GoVersion": "go1.18.3",
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function handle(conn: WebSocket, cmd: string) {
  console.log("handling", cmd);
  if (cmd.startsWith("{")) {
    try {
      let json = JSON.parse(cmd);
      console.log("got json", json);
      if (json.method) {
        handleMethod(conn, json.method, json.args);
      }
    } catch (e) {
    }
  }
}

function handleMethod(conn: WebSocket, method: string, args: (string | SignerPayloadJSON | SignerPayloadRaw)[] ) {
  if (method == "reverse") {
    let arg: string = <string>args[0];
    let payload = JSON.stringify({
      output: arg.split('').reverse().join(),
    }) + `\n`;
    console.log("sending", payload);
    conn.send(encoder.encode(payload));
  }
  if (method == "ls") {
    web3Accounts().then((accounts) => {
      let payload = JSON.stringify({
        output: accounts,
      }) + `\n`;
      console.log("sending", payload);
      conn.send(encoder.encode(payload));
    });
  }
  if (method == "signRaw") {
    let arg: SignerPayloadRaw = <SignerPayloadRaw>args[0];
    const address = arg.address
    web3FromAddress(address).then(({signer})=>{
      if (signer && signer.signRaw)
      signer.signRaw(arg).then((out: SignerResult) => {
        let payload = JSON.stringify(out) + `\n`;
        console.log("sending", payload);
        conn.send(encoder.encode(payload));
      });
    });
  }
  if (method == "signPayload") {
    let arg: SignerPayloadJSON = <SignerPayloadJSON>args[0];
    const address = arg.address
    web3FromAddress(address).then(({signer})=>{
      if (signer && signer.signPayload)
      signer.signPayload(arg).then((out: SignerResult) => {
	let payload = JSON.stringify(out) + `\n`;
	console.log("sending", payload);
	conn.send(encoder.encode(payload));
      });
    });
  }
}

export class Agent {
  public isReady = false;
  constructor(base: string, id: string) {
    const WS_URL = `${base}/api/rpc`;

    const WS_URL_ID = `${base}/api/jsonl?id=${id}`;

    const HEADER = JSON.stringify({
      "id": id,
      "name": `name_of_${id}`,
      "tags": [],
      "meta": META,
      "version": VERSION,
    }) + "\n";

    // new websocket connection
    let ws = new WebSocket(WS_URL);

    ws.binaryType = "arraybuffer";

    // register as agent
    ws.onopen = (e: Event) => {
      console.log("sending HEADER", HEADER);
      ws.send(encoder.encode(HEADER));
      console.log("sent HEADER");
    };

    ws.onclose = (e: CloseEvent) => {
      console.log("closed", e);
    };

    ws.onerror = (e: Event) => {
      console.log("errord", e);
    };

    ws.onmessage = (e: MessageEvent) => {
      let cmd = decoder.decode(e.data);
      console.log("recved", cmd);
      if (cmd == "PING\n") {
        this.isReady = true;
        ws.send(encoder.encode(`PONG\n`));
      }
      if (cmd == "JSONL\n") {
        let conn = new WebSocket(WS_URL_ID);
        conn.binaryType = "blob";
        conn.onmessage = async (e) => {
          let data = await e.data.text();
          console.log("recv", data);
          handle(conn, data);
          conn.send(encoder.encode(`${data.length}\n`));
          // let recv = decoder.decode(e.data)
          // console.log("recv", recv);
        };
      }
    };
  }
}


# Subshell cheatsheet

- get chain name
```
> api.runtimeChain.toHuman()
```

- get ss58 prefix
```
> api.consts.system.ss58Prefix.toHuman()
```

- get current block
```
> (await api.query.system.number()).toNumber()
```

- get runtime metadata version
```
> api.runtimeMetadata.version
```

- list accounts in Polkadot.js extension wallet
```
> await Subshell.extension?.web3Accounts()
```

- show account selection modal and select an account from the Polkadot.js extension wallet
```
> await Subshell.extension?.selectAccount()
```

- sign the message `BTW I USE SUBSHELL` with selected account, and verify the signature
```
> import { signatureVerify } from "@polkadot/util-crypto"
> const addr = await Subshell.extension.selectAccount()
> const msg = 'BTW I USE SUBSHELL'
> const sig = await api.sign(addr, {data: msg})
> signatureVerify(msg, sig, addr)
```

- sign and send the tx `api.tx.system.remark('BTW I USE SUBSHELL')` with selected account
```
> await api.tx.system.remark('BTW I USE SUBSHELL').signAndSend(await Subshell.extension?.selectAccount())
```

- show tx docs and args, etc.
```
> api.tx.system.remark
```

- show event docs and args, etc.
```
> api.events.balances.Transfer
```

- query total issuance of native currency
```
> (await api.query.balances.totalIssuance()).toHuman()
```

- query account balance
```
> (await api.query.system.account(await Subshell.extension?.selectAccount())).toHuman()
```

- ...

For more examples, please visit https://wiki.subshell.xyz

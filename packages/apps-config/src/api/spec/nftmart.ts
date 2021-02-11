// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

// structs need to be in order
/* eslint-disable sort-keys */
/* eslint-disable camelcase */

import {OverrideBundleDefinition} from "@polkadot/types/types";

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        // ----------- nftmart ---------------
        "CurrencyId" : "u32",
        "CurrencyIdOf" : "CurrencyId",
        "Amount" : "i128",
        "AmountOf" : "Amount",
        // ----------- other nft ---------------
        "NftItemType": {
          "Collection": "u64",
          "Owner": "AccountId",
          "Data": "Vec<u8>"
        },
        "CollectionType": {
          "Owner": "AccountId",
          "NextItemId": "u64",
          "CustomDataSize": "u32"
        },
        "Schedule": {
          "version": "u32",
          "put_code_per_byte_cost": "Gas",
          "grow_mem_cost": "Gas",
          "regular_op_cost": "Gas",
          "return_data_per_byte_cost": "Gas",
          "event_data_per_byte_cost": "Gas",
          "event_per_topic_cost": "Gas",
          "event_base_cost": "Gas",
          "call_base_cost": "Gas",
          "instantiate_base_cost": "Gas",
          "dispatch_base_cost": "Gas",
          "sandbox_data_read_cost": "Gas",
          "sandbox_data_write_cost": "Gas",
          "transfer_cost": "Gas",
          "instantiate_cost": "Gas",
          "max_event_topics": "u32",
          "max_stack_height": "u32",
          "max_memory_pages": "u32",
          "max_table_size": "u32",
          "enable_println": "bool",
          "max_subject_len": "u32"
        },
        "CollectionMode": {
          "_enum": {
            "Invalid": null,
            "NFT": "u32",
            "Fungible": "u32",
            "ReFungible": "(u32, u32)"
          }
        },
        "NftItemType": {
          "Collection": "u64",
          "Owner": "AccountId",
          "Data": "Vec<u8>"
        },
        "Ownership": {
          "owner": "AccountId",
          "fraction": "u128"
        },
        "ReFungibleItemType": {
          "Collection": "u64",
          "Owner": "Vec<Ownership<AccountId>>",
          "Data": "Vec<u8>"
        },
        "CollectionType": {
          "Owner": "AccountId",
          "Mode": "CollectionMode",
          "Access": "u8",
          "DecimalPoints": "u32",
          "Name": "Vec<u16>",
          "Description": "Vec<u16>",
          "TokenPrefix": "Vec<u8>",
          "CustomDataSize": "u32",
          "OffchainSchema": "Vec<u8>",
          "Sponsor": "AccountId",
          "UnconfirmedSponsor": "AccountId"
        }
      }
    }
  ]
};

export default definitions;

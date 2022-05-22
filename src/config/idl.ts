export type BoContract = {
  "version": "0.1.0",
  "name": "bo_contract",
  "instructions": [
    {
      "name": "initRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "lockTime",
          "type": "i64"
        },
        {
          "name": "closeTime",
          "type": "i64"
        },
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "lockRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "closeTime",
          "type": "i64"
        },
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "endRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "calculateRewards",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "betUp",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "betDown",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "round",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "pos",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "round",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "closeTime",
            "type": "i64"
          },
          {
            "name": "lockPrice",
            "type": "i64"
          },
          {
            "name": "closePrice",
            "type": "i64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "upAmount",
            "type": "u64"
          },
          {
            "name": "downAmount",
            "type": "u64"
          },
          {
            "name": "rewardBaseCalAmount",
            "type": "u64"
          },
          {
            "name": "rewardAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotActiveRound",
      "msg": "The round isn't active"
    },
    {
      "code": 6001,
      "name": "EndedRound",
      "msg": "The round is ended"
    },
    {
      "code": 6002,
      "name": "RoundNotStartedYet",
      "msg": "The round is not started"
    },
    {
      "code": 6003,
      "name": "LockBeforeLockTime",
      "msg": "Can only lock round after lockTimestamp"
    },
    {
      "code": 6004,
      "name": "CloseBeforeEndTime",
      "msg": "Can only end round after lockTimestamp"
    },
    {
      "code": 6005,
      "name": "WrongRound",
      "msg": "Wrong round"
    },
    {
      "code": 6006,
      "name": "NotEndedRound",
      "msg": "Round not ended"
    },
    {
      "code": 6007,
      "name": "AlreadyClaim",
      "msg": "You had claimed before"
    },
    {
      "code": 6008,
      "name": "NotClaimable",
      "msg": "Not claimable"
    }
  ]
};

export const IDL: BoContract = {
  "version": "0.1.0",
  "name": "bo_contract",
  "instructions": [
    {
      "name": "initRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "lockTime",
          "type": "i64"
        },
        {
          "name": "closeTime",
          "type": "i64"
        },
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "lockRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "closeTime",
          "type": "i64"
        },
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "endRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "calculateRewards",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "i64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "betUp",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "betDown",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasurer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "round",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "pos",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "round",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "closeTime",
            "type": "i64"
          },
          {
            "name": "lockPrice",
            "type": "i64"
          },
          {
            "name": "closePrice",
            "type": "i64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "upAmount",
            "type": "u64"
          },
          {
            "name": "downAmount",
            "type": "u64"
          },
          {
            "name": "rewardBaseCalAmount",
            "type": "u64"
          },
          {
            "name": "rewardAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotActiveRound",
      "msg": "The round isn't active"
    },
    {
      "code": 6001,
      "name": "EndedRound",
      "msg": "The round is ended"
    },
    {
      "code": 6002,
      "name": "RoundNotStartedYet",
      "msg": "The round is not started"
    },
    {
      "code": 6003,
      "name": "LockBeforeLockTime",
      "msg": "Can only lock round after lockTimestamp"
    },
    {
      "code": 6004,
      "name": "CloseBeforeEndTime",
      "msg": "Can only end round after lockTimestamp"
    },
    {
      "code": 6005,
      "name": "WrongRound",
      "msg": "Wrong round"
    },
    {
      "code": 6006,
      "name": "NotEndedRound",
      "msg": "Round not ended"
    },
    {
      "code": 6007,
      "name": "AlreadyClaim",
      "msg": "You had claimed before"
    },
    {
      "code": 6008,
      "name": "NotClaimable",
      "msg": "Not claimable"
    }
  ]
};

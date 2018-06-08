var BitbetBetAbi = [
    {
        "constant": false,
        "inputs": [],
        "name": "retrieveGain",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_team",
                "type": "string"
            }
        ],
        "name": "setBet",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "participantAccts",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getParticipants",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getParticipant",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_teamOne",
                "type": "string"
            },
            {
                "name": "_teamTwo",
                "type": "string"
            },
            {
                "name": "_teamOneRate",
                "type": "uint32"
            },
            {
                "name": "_teamTwoRate",
                "type": "uint32"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_betContrat",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_team",
                "type": "string"
            },
            {
                "indexed": true,
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "BetSet",
        "type": "event"
    }
];
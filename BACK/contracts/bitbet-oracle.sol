pragma solidity ^0.4.24;

import "./bitbet-bet.sol";

contract BitbetOracle {
    address private administrator;

    constructor() public {
        administrator = msg.sender;
    }

    function createBet() public {
        BitbetBet bitbetContract = new BitbetBet("teamOne", "teamTwo", 10, 12);
        // On ajoute le pari dans la table
        setBetTable(address(bitbetContract), "teamOne", false);
    }

    function setResult(BitbetBet _bitBetContract, string _winner, bool _finish) public {
        require(msg.sender == administrator);

        setBetTable(address(_bitBetContract), _winner, _finish);
    }

    mapping (address => Bet) bets;
    address[] public betsList;

    struct Bet {
        string winner;
        bool finish;
    }

    function setBetTable(address _address, string _winner, bool _finish) public {
        var bet = bets[_address];

        bet.winner = _winner;
        bet.finish = _finish;

        betsList.push(_address) -1;
    }

    function getBetsList() view public returns (address[]) {
        return betsList;
    }

    function getBet(address _address) view public returns (string, bool) {
        return (bets[_address].winner, bets[_address].finish);
    }
}

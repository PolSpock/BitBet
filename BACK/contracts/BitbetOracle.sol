pragma solidity ^0.4.23;

import "./BitbetBet.sol";

contract BitbetOracle {
    address private administrator;

    constructor() public {
        administrator = msg.sender;
    }

    function createBet(string _teamOne, string _teamTwo, uint32 _teamOneRate, uint32 _teamTwoRate) public {
        BitbetBet bitbetContract = new BitbetBet(_teamOne, _teamTwo, _teamOneRate, _teamTwoRate);
        // On ajoute le pari dans la table
        setBetTable(address(bitbetContract), _teamOne, _teamTwo, "", false);
    }

    function setResult(BitbetBet _bitBetContract, string _winner, bool _finish) public {
        require(msg.sender == administrator);

        setBetTable(address(_bitBetContract), "", "", _winner, _finish);
    }

    mapping (address => Bet) bets;
    address[] public betsList;

    struct Bet {
        string teamOne;
        string teamTwo;
        string winner;
        bool finish;
    }

    function setBetTable(address _address, string _teamOne, string _teamTwo, string _winner, bool _finish) public {
        var bet = bets[_address];

        bytes memory tmpTeamOne = bytes(_teamOne); // Uses memory
        bytes memory tmpTeamTwo = bytes(_teamTwo); // Uses memory
        if (tmpTeamOne.length != 0 && tmpTeamTwo.length != 0) {
            bet.teamOne = _teamOne;
            bet.teamTwo = _teamTwo;
        }

        if (keccak256(_winner) == keccak256(_teamOne) || keccak256(_winner) == keccak256(_teamTwo)) {
            bet.winner = _winner;
        }
        bet.finish = _finish;

        betsList.push(_address) -1;
    }

    function getBetsList() view public returns (address[]) {
        return betsList;
    }

    function getBet(address _address) view public returns (string, string, string, bool) {
        return (bets[_address].teamOne, bets[_address].teamTwo, bets[_address].winner, bets[_address].finish);
    }
}

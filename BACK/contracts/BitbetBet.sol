pragma solidity ^0.4.23;


import './BitBetOracleInterface.sol';

contract BitbetBet {

    string teamOne;
    string teamTwo;
    uint32 teamOneRate;
    uint32 teamTwoRate;
    address private administrator;
    mapping (address => Bet) participants;
    address[] public participantAccts;

    BitBetOracleInterface bitBetOracle;

    constructor(string _teamOne, string _teamTwo, uint32 _teamOneRate, uint32 _teamTwoRate) public payable {
        administrator = msg.sender;
        teamOne = _teamOne;
        teamTwo = _teamTwo;

        teamOneRate = _teamOneRate;
        teamTwoRate = _teamTwoRate;
    }

    struct Bet {
        string team;
        uint256 amount;
    }

    function setBet(string _team) public payable {
        require(msg.value >= 1 ether);
        require(keccak256(abi.encodePacked(teamOne)) == keccak256(abi.encodePacked(_team)) || keccak256(abi.encodePacked(teamTwo)) == keccak256(abi.encodePacked(_team)));
        var participant = participants[msg.sender];

        participant.team = _team;
        participant.amount = msg.value;

        participantAccts.push(msg.sender) -1;
    }


    function getParticipants() view public returns (address[]) {
        return participantAccts;
    }

    function getParticipant(address _address) view public returns (string, uint256) {
        return (participants[_address].team, participants[_address].amount);
    }

    /* Le client demande ses gains */
    function retrieveGain() payable public {
        var (team, amount) = getParticipant(msg.sender);
        var (winner, finish) = bitBetOracle.getBet(address(this));

        // le match doit être terminé
        require(finish);
        // l'utilisateur doit avoir voté pour l'équipe gagnante
        require(keccak256(abi.encodePacked(team)) == keccak256(abi.encodePacked(winner)));

        uint256 amtToGive;
        if (keccak256(abi.encodePacked(teamOne)) == keccak256(abi.encodePacked(winner))) {
            amtToGive = amount * teamOneRate;
        }
        else if (keccak256(abi.encodePacked(teamTwo)) == keccak256(abi.encodePacked(winner))) {
            amtToGive = amount * teamTwoRate;
        }

        msg.sender.transfer(amtToGive);
    }

}

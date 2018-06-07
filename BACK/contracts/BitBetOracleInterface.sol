pragma solidity ^0.4.23;

interface BitBetOracleInterface {

    function createBet() external;

    function getBet(address _address) external returns (string winner, bool finish);

}

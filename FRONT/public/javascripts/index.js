var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
var BitbetOracle;
var BitbetOracleInstance;
var userAccount;

function startApp() {
    var bitbetOracleAddress = "0x96da1b66047666d72b8676077cf01a0d70060d8b";
    BitbetOracle = web3.eth.contract([{"constant":false,"inputs":[{"name":"_bitBetContract","type":"address"},{"name":"_winner","type":"string"},{"name":"_finish","type":"bool"}],"name":"setResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBetsList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"betsList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_winner","type":"string"},{"name":"_finish","type":"bool"}],"name":"setBetTable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getBet","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    BitbetOracleInstance = BitbetOracle.at(bitbetOracleAddress);

    // Call a function to update the UI with the new account
    //getBetsList().then(displayBets);
    console.log(getBetsList());
}

function displayBets(betsAddress) {
    $("#betsBloc").empty();
    for (betAddress of betsAddress) {
        getBetDetail(betAddress).then(function(bet) {
            $("#betsBloc").append(`
                <tr>
                    <td>${bet}</td>
                    <td>0</td>
                    <td>0</td>
                </tr>`);
        })
    }
}

function getBetsList() {
    console.log(BitbetOracleInstance);
    return BitbetOracleInstance.getBetsList.call();
}

function getBetDetail(address) {
    return BitbetOracleInstance.getBet.call(address);
}

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        // Handle the case where the user doesn't have Metamask installed
        // Probably show them a message prompting them to install Metamask
    }

    // Now you can start your app & access web3 freely:
    startApp()

})

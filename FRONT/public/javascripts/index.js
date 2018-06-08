var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
var BitbetOracle;
var BitbetBet;
var userAccount;

function startApp() {
     web3.eth.getAccounts().then(function (res) {
        userAccount = res[0];
    });
    var bitbetOracleAddress = '0x96da1b66047666d72b8676077cf01a0d70060d8b';
    BitbetOracle = new web3.eth.Contract(BitbetOracleAbi, bitbetOracleAddress);

    getBetsList().then(function (res) {
        displayBets(res);
        displayEngagedBet(res);
    })
}

function displayBets(betsAddress) {
    $("#tbodyBetsBloc").empty();
    for (betAddress of betsAddress) {
        getBetDetail(betAddress).then(function(bet) {
            $("#tbodyBetsBloc").append(`
                <tr>
                    <td>${bet[0]} ${!bet[3] ? `<input data-address="${betAddress}" name="${bet[0]}" type="number" onkeydown="wannaBet(this)" placeholder="Parier pour cette équipe en indiquant un montant">`: ``}</td>
                    <td>${bet[1]} ${!bet[3] ? `<input data-address="${betAddress}" name="${bet[1]}" type="number" onkeydown="wannaBet(this)" placeholder="Parier pour cette équipe en indiquant un montant">`: ``}</td>
                    <td>${bet[2]}</td>
                    <td>${bet[3] ? `Oui` : `Non`}</td>
                </tr>
            `);
        });
    }
}

function displayEngagedBet(betsAddress) {
    $("#tbodyMyBetsBlocs").empty();
    for (betAddress of betsAddress) {
        BitbetBet = new web3.eth.Contract(BitbetBetAbi, betAddress);
        getParticipant(betAddress).then(function (result) {
            $("#tbodyMyBetsBlocs").append(`
                <tr>
                    <td>${result[0]}</td>
                    <td>${web3.utils.fromWei(result[1], 'ether')}</td>
                </tr>
            `);
        })
    }
}

function getBetsList() {
    return BitbetOracle.methods.getBetsList().call();
}

function getBetDetail(address) {
    return BitbetOracle.methods.getBet(address).call();
}

function createBet() {
    return BitbetOracle.methods.createBet().call();
}

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);

    } else {
        // Handle the case where the user doesn't have Metamask installed
        // Probably show them a message prompting them to install Metamask
    }

    // Now you can start your app & access web3 freely:
    startApp()

});

function setBet(value, teamName) {
    return BitbetBet.methods.setBet(teamName).send({ from: userAccount, value: web3.utils.toWei(value.toString(), "ether"), gas: 200000 });
}

function getParticipant() {
    return BitbetBet.methods.getParticipant(userAccount).call();
}

function wannaBet(ele) {
    if(event.keyCode == 13) {

        BitbetBet = new web3.eth.Contract(BitbetBetAbi, ele.dataset.address);
        setBet(ele.value, ele.name);

        console.log(BitbetBet);
        BitbetBet.events.BetSet()
            .on("data", function(event) {
                let data = event.returnValues;
                displayEngagedBet([BitbetBet._address])
            }).on("error", console.error);

    };
}
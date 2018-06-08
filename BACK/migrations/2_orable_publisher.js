const BitBetOracle = artifacts.require("./BitbetOracle.sol");

module.exports = async (deployer) => {

	await deployer.deploy(BitBetOracle);
	const bitBetOracle = await BitBetOracle.deployed().then(function(instance) {
  	console.log(instance);

		instance.createBet("Raynald", "Jesus", 1, 10);
		instance.createBet("Dofus", "Fortnite", 1, 10);
	});
};

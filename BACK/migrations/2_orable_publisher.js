const BitBetOracle = artifacts.require("./bitbetoracle.sol");

module.exports = async (deployer) => {

	await deployer.deploy(BitBetOracle);
	const bitBetOracle = await BitBetOracle.deployed();
};

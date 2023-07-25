const ImmuLedger = artifacts.require("ImmuLedger");

contract("ImmuLedger", accounts => {
  it("Should publish and retrieve research", async () => {
    const immuLedger = await ImmuLedger.deployed();

    // Publish a piece of research
    const hash = web3.utils.asciiToHex("research1");
    await immuLedger.publish(hash, { from: accounts[0] });

    // Retrieve the published research
    const result = await immuLedger.getResearch(hash);
    console.log("Result", result);
    assert.equal(result[0], accounts[0], "Research publisher does not match");
  });

  it("Should not publish the same research twice", async () => {
    const immuLedger = await ImmuLedger.deployed();

    // Publish a piece of research
    const hash = web3.utils.asciiToHex("research2");
    await immuLedger.publish(hash, { from: accounts[0] });

    // Attempt to publish the same piece of research
    try {
      await immuLedger.publish(hash, { from: accounts[0] });
      assert.fail("Expected revert not received");
    } catch (error) {
      const expectedError = "This research is already published.";
      assert(
        error.message.includes(expectedError),
        `Expected error message to include "${expectedError}". Got "${error.message}" instead.`
      );
    }
  });
});
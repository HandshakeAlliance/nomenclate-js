const NomenclateClient = require("../lib/index.js");
const assert = require("bsert");

//TODO make this configurable
//for both internal nodes spun up, and localhost nodes.
const options = {
  host: "localhost",
  port: 8080
};

describe("Http Tests", function() {
  this.timeout(5000);
  let client;

  before(async () => {
    client = new NomenclateClient(options);

    await client.open();
  });

  after(async () => {
    await client.close();
  });

  it("should return a raw header hex string", async () => {
    let result = await client.getHeader(5);

    assert(result.header);
  });

  it("should return the merkle proof when checkpoint height is not 0", async () => {
    let result = await client.getHeader(5, 8);

    assert(result.header);
    assert(result.branch);
    assert(result.root);
  });

  it("should return hex data for the amount of headers requested", async () => {
    let result = await client.getHeaders(5, 2);

    assert(result.count == 2);
    assert(result.hex);
    assert(result.max);
  });

  it("should return merkle proof for all headers requested", async () => {
    let result = await client.getHeaders(4, 2, 8);

    assert(result.count == 2);
    assert(result.hex);
    assert(result.max);
    assert(result.branch);
    assert(result.root);
  });

  it("should return fee estimate", async () => {
    let result = await client.estimateFee(10);

    assert(typeof result.fee === "number");
  });

  it("should return the specific nomenclate instance's fee for relaying txs", async () => {
    let result = await client.relayFee();

    assert(typeof result.fee === "number");
  });

  it("should return raw transaction hex", async () => {
    let result = await client.getTransaction(
      "5c500def0d0ebf0fe325d66ce7e56992809d5da7837c6dd563cbea272e8ab201"
    );

    assert(result.hex);
  });

  it("should return raw transaction hex and merkle proof", async () => {
    let result = await client.getTransaction(
      "5c500def0d0ebf0fe325d66ce7e56992809d5da7837c6dd563cbea272e8ab201",
      true
    );

    assert(result.hex);
    assert(result.pos);
    assert(result.block_height);
    assert(result.merkle);
  });

  it("should return verbose transaction information", async () => {
    let result = await client.getTransaction(
      "5c500def0d0ebf0fe325d66ce7e56992809d5da7837c6dd563cbea272e8ab201",
      false,
      true
    );

    assert(result.txid);
    assert(result.hash);
  });

  it("should return verbose transaction information and merkle proof", async () => {
    let result = await client.getTransaction(
      "5c500def0d0ebf0fe325d66ce7e56992809d5da7837c6dd563cbea272e8ab201",
      true,
      true
    );

    assert(result.txid);
    assert(result.hash);
    assert(result.merkle);
    assert(result.hex);
  });

  //TODO test broadcast, but likely can only test on regtest networks.
  //
  it("should return merkle proof information for tx", async () => {
    let result = await client.getMerkle(
      "0ded93a1f39b9b0b3692dbfdb89dce9a8777608f27de365ecb8cf04d94450e88",
      9634
    );

    assert(result.merkle);
    assert(result.pos);
    assert(result.block_height);
  });
});

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
});

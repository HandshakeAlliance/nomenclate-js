/*!
 * index.js - http client for Nomenclate servers.
 * Copyright (c) 2017-2018, Christopher Jeffrey (MIT License).
 * Copyright (c) 2018, Handshake Alliance Developers (MIT License).
 * https://github.com/handshakealliance/nomenclate-js
 */

"use strict";

const assert = require("bsert");
const { Client } = require("bcurl");

/**
 * Nomenclate Client
 * @extends {bcurl.Client}
 */

class NomenclateClient extends Client {
  /**
   * Creat a nomenclate client.
   * @param {Object?} options
   */

  constructor(options) {
    //Add some sensible defaults here.
    super(options);
  }

  /**
   *
   *
   *
   * Blockchain Calls
   *
   *
   *
   **/

  /**
   * Returns the raw hex of the header if cp_height = 0, otherwise also returns a merkle proof
   * @param {Number} height
   * @param {Number} [cp_height=0]
   * @returns {Promise}
   */

  getHeader(height, cp_height = 0) {
    assert(typeof height === "number");
    assert(typeof cp_height === "number");
    assert(height >= 0);
    assert(cp_height >= 0);
    if (cp_height != 0) {
      assert(height <= cp_height);
    }

    return this.get(`/nomenclate/block/${height}/header`, { cp_height });
  }

  /**
   * Returns the raw hex of the header if cp_height = 0, otherwise also returns a merkle proof
   * @param {Number} height
   * @param {Number} [cp_height=0]
   * @returns {Promise}
   */
  getHeaders(height, count = 0, cp_height = 0) {
    assert(typeof height === "number");
    assert(typeof height === "number");
    assert(typeof height === "number");
    assert(height >= 0);
    assert(count >= 0);
    assert(cp_height >= 0);

    if (cp_height != 0) {
      assert(height + (count - 1) <= cp_height);
    }

    return this.get(`/nomenclate/block/${height}/headers`, {
      count,
      cp_height
    });
  }

  /**
   * Return a set of utxos from an address
   * @param {String} address
   * @param {Number} limit
   * @param {Number} offset
   * @returns {Promise}
   */

  listUnspent(address, limit = 25, offset = 0) {
    assert(typeof address === "string");
    assert(typeof limit === "number");
    assert(typeof offset === "number");

    return this.get(`/nomenclate/address/${address}/unspent`, {
      limit,
      offset
    });
  }

  /**
   * Get the transaction history of an address
   * @param {String} address
   * @param {Number} limit
   * @param {Number} offset
   * @returns {Promise}
   */

  addressHistory(address, limit = 10, offset = 0) {
    assert(typeof address === "string");
    assert(typeof limit === "number");
    assert(typeof offset === "number");

    return this.get(`/nomenclate/address/${address}/history`, {
      limit,
      offset
    });
  }

  /**
   * Return the balance of the address
   * @param {String} address
   * @returns {Promise}
   */

  addressBalance(address) {
    assert(typeof address === "string");
    return this.get(`/nomenclate/address/${address}/balance`);
  }

  /**
   * Get the transaction/auction history of the name
   * @param {String} name
   * @returns {Promise}
   */

  getNameHistory(name, limit = 10, offset = 0) {
    assert(typeof name === "string");
    assert(typeof limit === "number");
    assert(typeof offset === "number");

    return this.get(
      `/nomenclate/name/${name}/history?offset=${offset}&limit=${limit}`
    );
  }
}

/*
 * Expose
 */

module.exports = NomenclateClient;

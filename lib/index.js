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
   * Return an estimate fee based on the past n blocks
   * @param {Number} blocks_count - Number of blocks to estimate fee from.
   * @returns {Promise}
   */
  estimateFee(blocks_count) {
    assert(typeof blocks_count === "number");
    assert(blocks_count >= 0);

    return this.get(`/nomenclate/blockchain/estimatefee`, { blocks_count });
  }

  /**
   * Return the fee that this nomenclate instance charges to relay transactions
   * @returns {Promise}
   */
  relayFee() {
    return this.get(`/nomenclate/blockchain/relayfee`);
  }

  /**
   *
   *
   *
   * Transaction Calls
   *
   *
   *
   **/

  /**
   * Return transaction information
   * @param {String} hash - transaction hash or id
   * @param {Boolean} merkle - whether or not to return merkle proof
   * @param {Boolean} verbose - whether or not to return verbose tx info
   * @returns {Promise}
   */
  getTransaction(hash, merkle = false, verbose = false) {
    assert(typeof hash === "string", "Invalid transaction hash format");
    assert(hash.length === 64, "Invalid transaction hash length");

    return this.get(`/nomenclate/transaction/${hash}`, { merkle, verbose });
  }

  /**
   * Broadcast a transaction to the network
   * @param {String} hex - signed transaction hex
   * @returns {Promise}
   */
  broadcastTransaction(hex) {
    assert(typeof hex === "string");

    return this.post(`/nomenclate/transaction/broadcast`, { tx: hex });
  }

  /**
   * Get merkle proof based on tx hash and block height
   * @param {String} hash
   * @param {Number} blockheight
   * @returns {Promise}
   */
  getMerkle(hash, blockheight) {
    assert(typeof hash === "string");
    assert(hash.length === 64);
    assert(blockheight >= 0);
    assert(typeof blockheight === "number");

    return this.get(`/nomenclate/transaction/${hash}/merkle/${blockheight}`);
  }

  /**
   * Get transaction hash by position
   * @param {Number} height
   * @param {Number} index
   * @param {Boolean} merkle
   * @returns {Promise}
   */
  getTransactionByPosition(height, index, merkle = false) {
    assert(typeof height === "number");
    assert(typeof index === "number");
    assert(height >= 0);
    assert(index >= 0);

    return this.get(`/nomenclate/transaction/${height}/byPosition/${index}`, {
      merkle
    });
  }

  /**
   *
   *
   *
   * Address Calls
   *
   *
   *
   **/

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
   *
   *
   *
   * Server Calls
   *
   *
   *
   **/

  /**
   * Return server banner
   * @returns {Promise}
   */
  banner() {
    return this.get(`/nomenclate/banner`);
  }

  /**
   * Return server features
   * @returns {Promise}
   */
  features() {
    return this.get(`/nomenclate/features`);
  }

  /**
   * Ping server
   * @returns {Promise}
   */
  ping() {
    return this.get(`/nomenclate/ping`);
  }

  /**
   * return server version
   * @returns {Promise}
   */
  version() {
    return this.get(`/nomenclate/version`);
  }

  /**
   *
   *
   *
   * Name Calls
   *
   *
   *
   **/

  /**
   * Get the transaction/auction history of the name
   * @param {String} name
   * @param {Number} limit
   * @param {Number} offset
   * @returns {Promise}
   */

  getNameHistory(name, limit = 10, offset = 0) {
    assert(typeof name === "string");
    assert(typeof limit === "number");
    assert(typeof offset === "number");

    return this.get(`/nomenclate/name/${name}/history`, { limit, offset });
  }
}

/*
 * Expose
 */

module.exports = NomenclateClient;

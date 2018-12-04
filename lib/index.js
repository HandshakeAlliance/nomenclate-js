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
   * Get the transaction history of an address
   * @param {String} address
   * @returns {Promise}
   */

  //XXX todo, allow for parameters to be passed through.
  getAddressHistory(address) {
    assert(typeof address === "string");
    return this.get(`/nomenclate/address/${address}/history`);
  }

  /**
   * Return the balance of the address
   * @param {String} address
   * @returns {Promise}
   */

  getAddressBalance(address) {
    assert(typeof address === "string");
    return this.get(`/nomenclate/address/${address}/balance`);
  }

  /**
   * Get the transaction/auction history of the name
   * @param {String} name
   * @returns {Promise}
   */

  getNameHistory(name) {
    assert(typeof name === "string");
    return this.get(`/nomenclate/name/${address}/history`);
  }
}

/*
 * Expose
 */

module.exports = NomenclateClient;

'use strict';

/**
 *  * Wraps Prometheus client - https://github.com/siimon/prom-client
 *   * Goal: use metrics in any file of an app
 *    */

var assert = require('assert');
var client = require('prom-client');

var references = {};
var namespace = '';

module.exports = {
  /**
 *    * Sets a namespace for all the metrics created after its call
 *       * @param ns
 *          */
  setNamespace: function(ns) {
    assert(typeof ns === 'string');
    namespace = ns;
  },

  /**
 *    * What to expose in /metrics in your server
 *       */
  getMetrics: function() {
    return client.register.metrics();
  },

  /**
 *    * Get metric by its name
 *       * @param name
 *          * @returns {*}
 *             */
  get: function (name) {
    return references[name];
  },

  createCounter: function (name, help, labels) {
    if (labels === undefined) {
      labels = [];
    }
    references[name] = new client.Counter(namespace + '_' + name, help, labels);
    return references[name];
  },

  createGauge: function (name, help, labels) {
    if (labels === undefined) {
      labels = [];
    }
    references[name] = new client.Gauge(namespace + '_' + name, help, labels);
    return references[name];
  },

  createHistogram: function (name, help, params, labels) {
    if (labels === undefined) {
      labels = [];
    }
    references[name] = new client.Histogram(namespace + '_' + name, help, labels, params);
    return references[name];
  },

  createSummary: function (name, help, params, labels) {
    if (labels === undefined) {
      labels = [];
    }
    references[name] = new client.Summary(namespace + '_' + name, help, labels, params);
    return references[name];
  },
  collectDefaultMetrics: client.collectDefaultMetrics
};
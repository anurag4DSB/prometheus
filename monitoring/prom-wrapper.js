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

  createCounter: function (metrics_name, metrics_help, metrics_lables) {
    if (metrics_lables === undefined) {
      metrics_lables = [];
    }
    references[metrics_name] = new client.Counter({
        name: metrics_name,
        help: metrics_help,
        labels: metrics_lables
    });
    return references[metrics_name];
  },

  createGauge: function (metrics_name, metrics_help, metrics_lables) {
    if (metrics_lables === undefined) {
      metrics_lables = [];
    }
    references[metrics_name] = new client.Gauge({
        name: namespace + '_' + metrics_name, 
        help: metrics_help, 
        labels: metrics_lables
    });
    return references[metrics_name];
  },

  createHistogram: function (metrics_name, metrics_help, metrics_params, metrics_lables) {
    if (metrics_lables === undefined) {
      metrics_lables = [];
    }
    references[metrics_name] = new client.Histogram({
        name: namespace + '_' + metrics_name, 
        help: metrics_help, 
        params: metrics_params,
        labels: metrics_lables,
    });
    return references[metrics_name];
  },

  createSummary: function (metrics_name, metrics_help, metrics_params, metrics_lables) {
    if (metrics_lables === undefined) {
      metrics_lables = [];
    }
    references[metrics_name] = new client.Summary({
        name: namespace + '_' + metrics_name, 
        help: metrics_help, 
        params: metrics_params,
        labels: metrics_lables,
    });
    return references[metrics_name];
  },
  collectDefaultMetrics: client.collectDefaultMetrics
};
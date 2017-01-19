/**
 * Module dependencies
 */

const combine = require('combine-errors')
const superagent = require('superagent')
// const popsicle = require('popsicle')

/**
 * GRAPHCOOL_URL
 */

const GRAPHCOOL_URL = 'https://api.graph.cool/simple/v1/cixap15jy31av0111cidov8hf'

/**
 * Export `Graph`
 */

module.exports = Graph

/**
 * Initialize `Graph`
 *
 * @param {String} query
 * @param {Object} variables
 * @return {Promise}
 */

async function Graph (query, variables = {}, headers = {}) {
  const body = { query: query, variables: variables || {} }

  const res = await superagent
    .post(GRAPHCOOL_URL)
    .set(headers || {})
    .send(body)

  if (res.body.errors) {
    return combine(res.body.errors.map(error => new Error(error.message)))
  } else if (res.body.error) {
    return res.body.error
  } else {
    return res.body.data
  }
}

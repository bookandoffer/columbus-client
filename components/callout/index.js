/**
 * Module Dependencies
 */

import { Component } from 'react'

/**
 * Callout
 */

export default function Callout (fn) {
  const channel = {
    fn: function () {},
    subscribe (fn) { this.fn = fn },
    publish (props) { this.fn(props) }
  }

  class Callout extends Component {
    static setState (state) {
      channel.publish(state)
    }

    constructor (props) {
      super(props)
      this.state = {}
      channel.subscribe(state => this.setState(state))
    }

    render () {
      return fn(Object.assign({}, this.props, this.state || {}))
    }
  }

  return Callout
}

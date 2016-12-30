import cookies from 'next-cookies'
import { Component } from 'react'
import graph from '../lib/graph'

export default class Me extends Component {
  static async getInitialProps (ctx) {
    const { token } = cookies(ctx)
    console.log('token', token ? 'yes' : 'no')
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render (props) {
    return (
      <div>me</div>
    )
  }
}

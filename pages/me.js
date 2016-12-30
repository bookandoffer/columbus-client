import Header from '../components/header'
import loadUser from '../lib/load-user'
import Head from '../components/head'
import cookies from 'next-cookies'
import { Component } from 'react'
import graph from '../lib/graph'

export default class Me extends Component {
  static async getInitialProps (ctx) {
    const { token } = cookies(ctx)
    if (ctx.req && !token) {
      return ctx.res.writeHead(302, { Location: '/' })
    } else if (!token) {
      document.location.pathname = '/'
      return
    }

    const res = await loadUser(token)

    // @TODO figure out how we should handle this error
    if (res instanceof Error) {
      return ctx.res.writeHead(302, { Location: '/' })
    }

    return { user: res.user }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log('user', this.props.user)
    return (
      <div>
        <Head title='Columbus | My courses' />
        <Header token={this.props.cookies && this.props.cookies.token} />
      </div>
    )
  }
}

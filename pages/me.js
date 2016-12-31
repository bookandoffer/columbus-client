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
        <div className='subnav layout horizontal bg-484848'>
          <div className='center pv3'>
            <a className='f6 c-ffffff mh3 link' href='#'>Deine Kurse</a>
            <a className='f6 c-ffffff mh3 link' href='#'>Profil</a>
          </div>
        </div>
        <div className='layout horizontal mw8 mt5 m-auto'>
          <div className='layout vertical'>
            <a className='mt3 c-484848 link b' href='#'>Dein Inserate</a>
            <a className='mt3 c-484848 link' href='#'>Meine Buchungen</a>
            <a className='mt3 c-484848 link' href='#'>Buchungsvoraussetzungen</a>
            <button className='mt4 btn-green'>Neue Inserate hinzufügen</button>
          </div>
          <div className='layout vertical flex'>
            <div className='bg-ededed pa3'>In Bearbeitung</div>
          </div>
        </div>
      </div>
    )
  }
}

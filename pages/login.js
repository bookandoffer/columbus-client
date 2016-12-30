
import { Component } from 'react'
import Head from 'next/head'
import Portal from 'react-portal'
import Login from '../components/login'

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (props) {
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
          <link href='/static/tachyons.css' rel='stylesheet' />
          <link href='/static/flex.css' rel='stylesheet' />
          <link href='/static/global.css' rel='stylesheet' />
          <link href='/static/theme.css' rel='stylesheet' />
        </Head>
        <div>
          {/* <Portal ref='loginModal' /> */}
          <button className='ma5' onClick={() => this.refs.loginModal.openPortal()}>open login</button>
          <Login />
        </div>
      </div>
    )
  }
}

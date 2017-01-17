import cookie from 'component-cookie'
import { Component } from 'react'
import Portal from 'react-portal'
import Router from 'next/router'
import Login from '../login'
import Link from 'next/link'

const browser = typeof window !== 'undefined'

export default class Header extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      loggedIn: browser ? !!cookie('token') : false,
      clicked: false,
      tab: 'login'
    }
  }

  createCourse () {
    if (this.state.loggedIn) {
      Router.push('/create-course')
    } else {
      this.setState({ tab: 'login' }, () => this.refs.loginModal.openPortal())
    }
  }

  render (props) {
    return (
      <div className='layout horizontal pa2 center mb0 sysFont' style={{'height': '50px'}}>
        <Link href='/' className='link' style={{ textDecoration: 'none' }}><div className='b f5 mid-gray layout horizontal center'>{/*<img src='/static/globe.svg' style={{'height': '30px', 'marginLeft': '25px', 'marginRight': '25px'}} />*/}bookandoffer</div></Link>
        <div className='ph3 f7 mid-gray pointer' style={{'marginLeft': 'auto'}} onClick={() => this.createCourse()}>KURS EINSTELLEN</div>
        <Link href='/categories'><div className='ph3 f7 mid-gray pointer'>KATEGORIEN</div></Link>
        <div className='ph3 f7 mid-gray pointer' onClick={() => { this.setState({ tab: 'signup' }, () => this.refs.loginModal.openPortal()) }}>REGISTRIEREN</div>
        <div className='ph3 f7 mid-gray pointer' onClick={() => { this.setState({ tab: 'login' }, () => this.refs.loginModal.openPortal()) }}>LOGIN</div>
        <Portal ref='loginModal'>
          <Login tab={this.state.tab} />
        </Portal>
      </div>
    )
  }
}

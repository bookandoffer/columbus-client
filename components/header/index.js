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
      <div className='layout horizontal wrap pt2 pb0 ph2 center mb0 sysFont' style={{'minHeight': '50px'}}>
        <div className = "headerWidth"><Link href='/' className='link' style={{ textDecoration: 'none' }}><div className='b f5 mid-gray headerWidth layout horizontal center'>{/*<img src='/static/globe.svg' style={{'height': '30px', 'marginLeft': '25px', 'marginRight': '25px'}} />*/}bookandoffer</div></Link></div>
        <div className='ph3 f7 mid-gray headerWidth pointer pv3' style = {{"marginLeft":"auto"}} onClick={() => this.createCourse()}>KURS EINSTELLEN</div>
        <div className = "headerWidth items-center justify-center"><Link href='/categories'><div className='ph3 h-100 f7 mid-gray pointer pv3'>KATEGORIEN</div></Link></div>
        { 
          this.state.loggedIn
          ? null
          : (
            <div className='layout horizontal wrap headerWidthDouble'>
              <div className='ph3 f7 mid-gray headerWidth pointer pv3' onClick={() => { this.setState({ tab: 'signup' }, () => this.refs.loginModal.openPortal()) }}>REGISTRIEREN</div>
              <div className='ph3 f7 mid-gray headerWidth pointer pv3' onClick={() => { this.setState({ tab: 'login' }, () => this.refs.loginModal.openPortal()) }}>LOGIN</div>
            </div>
          )
        }
        <Portal ref='loginModal'>
          <Login tab={this.state.tab} />
        </Portal>
      </div>
    )
  }
}

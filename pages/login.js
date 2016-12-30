
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
        <div>
          {/* <Portal ref='loginModal' /> */}
          <button className='ma5' onClick={() => this.refs.loginModal.openPortal()}>open login</button>
          <Login />
        </div>
      </div>
    )
  }
}


import { Component } from 'react'
import Portal from 'react-portal'
import Head from '../components/head'
import Login from '../components/login'

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (props) {
    return (
      <div>
        <Head title='login' />
        <div>
          {/* <Portal ref='loginModal' /> */}
          <button className='ma5' onClick={() => this.refs.loginModal.openPortal()}>open login</button>
          <Login />
        </div>
      </div>
    )
  }
}

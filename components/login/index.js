
import { Component } from 'react'

export default class Element extends Component {
  constructor (props) {
    super(props)
    this.state = { tab: 'login' }
    this.outside = this.handleMouseClickOutside.bind(this)
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.outside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.outside)
  }

  handleMouseClickOutside (e) {
    if (this.isNodeInRoot(e.target, this.refs.content)) return
    e.stopPropagation()
    this.props.closePortal()
  }

  isNodeInRoot (node, root) {
    while (node) {
      if (node === root) return true
      node = node.parentNode
    }
    return false
  }

  login () {
    this.setState({ tab: 'login' })
  }

  signup () {
    this.setState({ tab: 'signup' })
  }

  render () {
    const Contents = (() => {
      switch (this.state.tab) {
        case 'signup': return <Signup {...this.props} onLogin={() => this.login()} onSignup={() => this.signup()} />
        default: return <Login {...this.props} onLogin={() => this.login()} onSignup={() => this.signup()} />
      }
    })()

    return (
      <div className='absolute absolute--fill layout horizontal center'>
        <div className='center ba b--light-gray pa5' ref='content'>
          {Contents}
        </div>
      </div>
    )
  }
}

const Signup = (props) => (
  <div>
    <label className='db pv3 ph3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='Vorname' />
      <i className='material-icons'>face</i>
    </label>
    <label className='db pv3 ph3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='Nachname' />
      <i className='material-icons'>face</i>
    </label>
    <label className='db pv3 ph3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='E-Mail-Adresse' />
      <i className='material-icons'>email</i>
    </label>
    <label className='db pv3 ph3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='Neues Passwort' />
      <i className='material-icons'>lock</i>
    </label>
    <button onClick={() => props.onLogin()}>Login</button>
  </div>
)

const Login = (props) => (
  <div>
    <label className='db pv3 ph3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='E-Mail-Adresse' />
      <i className='material-icons'>email</i>
    </label>
    <label className='db pv3 ph3 mt3 ba b--mid-gray layout horizontal center'>
      <input type='text' className='bn outline-0' placeholder='Passwort' />
      <i className='material-icons'>lock</i>
    </label>
    <button className='btn' onClick={() => props.onLogin()}>Einloggen</button>
    <div className='layout horizontal'>
      <span className='c-3A888D'>Hast du noch keinen Account?</span>
      <button className='btn-alt mla' onClick={() => props.onSignup()}>Registrieren</button>
    </div>
  </div>

)

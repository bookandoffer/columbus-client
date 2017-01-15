
const currentYear = new Date().getFullYear()
import cookie from 'component-cookie'
import { Component } from 'react'
import graph from '../../lib/graph'
import cls from 'classnames'
import Router from 'next/router'

export default class Element extends Component {
  constructor (props) {
    super(props)
    this.state = { tab: this.props.tab || 'login' }
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
    this.props.closePortal && this.props.closePortal()
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
      <div className='fixed absolute--fill layout horizontal center'>
        <div className='center ba b--silver ph5 pb5 m-auto bg-FFFFFF' ref='content'>
          <div className='f3 b tc pv5 mb0'>bookandoffer</div>
          {Contents}
        </div>
      </div>
    )
  }
}

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async signup () {
    const { firstName, lastName, email, password, month, day, year } = this.state
    let errors = false

    if (firstName && firstName.length >= 2) {
      this.setState({ firstNameError: null })
    } else {
      this.setState({ firstNameError: 'First name must be atleast 2 characters' })
      errors = true
    }

    if (lastName && lastName.length >= 2) {
      this.setState({ lastNameError: null })
    } else {
      this.setState({ lastNameError: 'First name must be atleast 2 characters' })
      errors = true
    }

    if (email && email.length >= 5 && ~email.indexOf('@') && email.indexOf('.')) {
      this.setState({ emailError: null })
    } else {
      this.setState({ emailError: 'Invalid email address' })
      errors = true
    }

    if (password && password.length >= 6) {
      this.setState({ passwordError: null })
    } else {
      this.setState({ passwordError: 'Password must be atleast 6 characters' })
      errors = true
    }

    if (month && day && year) {
      this.setState({ birthdateError: null })
    } else {
      this.setState({ birthdateError: 'Must enter your birthdate' })
      errors = true
    }

    if (errors) return

    const birthdate = new Date(`${month}/${day}/${year}`)

    // create the user
    let res = await graph(`
      mutation signup ($email: String!, $password: String!, $firstName: String!, $lastName: String!, $birthdate: DateTime!) {
        user: createUser (authProvider: { email: { email: $email, password: $password } }, firstName: $firstName, lastName: $lastName, birthdate: $birthdate) {
          id
        }
      }
      `, { firstName, lastName, email, password, birthdate })
    if (res instanceof Error) {
      window.alert(e.message)
      return
    }

    res = await graph(`
      mutation signin ($email: String!, $password: String!) {
        user: signinUser(email: {email: $email, password: $password }) {
          token
        }
      }
      `, { email, password })
    if (res instanceof Error) {
      window.alert(e.message)
      return
    }

    if (res && res.user) {
      cookie('token', res.user.token)
      Router.push('/me')
    }
  }

  render () {
    return (
      <div>
        <div className='db'>
          { this.state.firstNameError && <div className='c-B24334'>{this.state.firstNameError}</div> }
          <label className='label layout horizontal center pv3 ph3 ba b--silver'>
            <input onInput={(e) => this.setState({ firstName: e.target.value, firstNameError: null })} value={this.state.firstName || ''} type='text' className='w-100 bn outline-0' placeholder='Vorname' />
            <i className='material-icons'>face</i>
          </label>
        </div>
        <div className='db mt3'>
          { this.state.lastNameError && <div className='c-B24334'>{this.state.lastNameError}</div> }
          <label className='label layout horizontal center pv3 ph3 ba b--silver'>
            <input onInput={(e) => this.setState({ lastName: e.target.value, lastNameError: null })} value={this.state.lastName || ''} type='text' className='w-100 bn outline-0' placeholder='Nachname' />
            <i className='material-icons'>face</i>
          </label>
        </div>
        <div className='db mt3'>
          { this.state.emailError && <div className='c-B24334'>{this.state.emailError}</div> }
          <label className='label layout horizontal center pv3 ph3 ba b--silver'>
            <input onInput={(e) => this.setState({ email: e.target.value, emailError: null })} value={this.state.email || ''} type='text' className='w-100 bn outline-0' placeholder='E-Mail-Adresse' />
            <i className='material-icons'>email</i>
          </label>
        </div>
        <div className='db mt3'>
          { this.state.passwordError && <div className='c-B24334'>{this.state.passwordError}</div> }
          <label className='label layout horizontal center pv3 ph3 ba b--silver'>
            <input onInput={(e) => this.setState({ password: e.target.value, passwordError: null })} value={this.state.password || ''} type='password' className='w-100 bn outline-0' placeholder='Neues Passwort' />
            <i className='material-icons'>lock</i>
          </label>
        </div>
        <label htmlFor='Geburtstag'>
          <div className='layout horizontal center mb1 ml1 mt4'>
            <strong className='f7 fw4'>Geburtstag</strong>
            <i className='material-icons f6 ml1'>help</i>
          </div>
          { this.state.birthdateError && <div style={{color: 'red'}}>{this.state.birthdateError}</div> }
          <div className='layout horizontal'>
            <select className='select flex-2' onChange={(e) => this.setState({ month: e.target.value, birthdateError: null })}>
              <option key='' value='' default>Monat</option>
              <option key='1' value='1'>Januar</option>
              <option key='2' value='2'>Februar</option>
              <option key='3' value='3'>März</option>
              <option key='4' value='4'>April</option>
              <option key='5' value='5'>Kann</option>
              <option key='6' value='6'>Juni</option>
              <option key='7' value='7'>Juli</option>
              <option key='8' value='8'>August</option>
              <option key='9' value='9'>September</option>
              <option key='10' value='10'>Oktober</option>
              <option key='11' value='11'>November</option>
              <option key='12' value='12'>Dezember</option>
            </select>
            <select className='select flex-1 ml3' onChange={(e) => this.setState({ day: e.target.value, birthdateError: null })}>
              <option value='' default>Tag</option>
              {Array.apply(null, Array(31)).map((_, i) => <option key={i + 1} value={i + 1} default>{i + 1}</option>)}
            </select>
            <select className='select flex-1 ml3' onChange={(e) => this.setState({ year: e.target.value, birthdateError: null })}>
              <option value='' default>Jahr</option>
              {Array.apply(null, Array(123)).map((_, i) => <option key={currentYear - i} value={currentYear - i} default>{currentYear - i}</option>)}
            </select>
          </div>
        </label>
        <button className='btn w-100 mt4' onClick={() => this.signup()}>Registrieren</button>
        <div className='layout horizontal bt b--light-gray mt4 pt4 center'>
          <span className='c-45A399 b'>Hast du schon einen bookandoffer Account?</span>
          <button className='btn-alt mla br2 ml4' onClick={() => this.props.onLogin()}>Einloggen</button>
        </div>
      </div>
    )
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async login () {
    const { email, password} = this.state
    let errors = false

    if (email && email.length >= 5 && ~email.indexOf('@') && email.indexOf('.')) {
      this.setState({ emailError: null })
    } else {
      this.setState({ emailError: 'Invalid email address' })
      errors = true
    }

    if (password && password.length >= 6) {
      this.setState({ passwordError: null })
    } else {
      this.setState({ passwordError: 'Password must be atleast 6 characters' })
      errors = true
    }

    if (errors) return

    let res = await graph(`
      mutation signin ($email: String!, $password: String!) {
        user: signinUser(email: {email: $email, password: $password }) {
          token
        }
      }
      `, { email, password })

    if (res instanceof Error) {
      window.alert(res.message)
    } else if (res.user) {
      cookie('token', res.user.token)
      Router.push('/me')
    } else {
      window.alert('couldnt find a user with that info')
    }
  }

  render () {
    return (
      <div>
        <label className='db'>
          { this.state.emailError && <div className='c-B24334'>{this.state.emailError}</div> }
          <div className='layout horizontal center pv3 ph3 ba b--light-silver'>
            <input onInput={(e) => this.setState({ email: e.target.value, emailError: null })} value={this.state.email || ''} type='text' className='w-100 bn outline-0' placeholder='E-Mail-Adresse' />
            <i className='material-icons'>email</i>
          </div>
        </label>
        <label className='db mt3'>
          { this.state.passwordError && <div className='c-B24334'>{this.state.passwordError}</div> }
          <div className='layout horizontal center pv3 ph3 ba b--light-silver'>
            <input onInput={(e) => this.setState({ password: e.target.value, passwordError: null })} value={this.state.password || ''} type='password' className='w-100 bn outline-0' placeholder='Passwort' />
            <i className='material-icons'>lock</i>
          </div>
        </label>
        <button className='btn w-100 mt4' onClick={() => this.login()}>Einloggen</button>
        <div className='layout horizontal bt b--light-gray mt4 pt4 center'>
          <span className='c-45A399 b'>Hast du noch keinen Account?</span>
          <button className='btn-alt mla br2 ml4' onClick={() => this.props.onSignup()}>Registrieren</button>
        </div>
      </div>
    )
  }
}

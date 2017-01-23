/**
 * Module dependencies
 */

import { Component } from 'react'
import Callout from '../callout'
import cls from 'classnames'

/**
 * Initialize `Status`
 */

export default Callout(function (props) {
  return <Status {...props} />
})

class Status extends Component {
  constructor (props) {
    super(props)
    this.state = { hide: true }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fade) setTimeout(() => this.setState({ hide: true }), newProps.fade)
    this.setState({ hide: false })
  }

  onHide () {
    this.setState({ hide: true })
  }

  render () {
    const props = this.props
    const { hide } = this.state || {}
    const status = (() => {
      if (props.error) return <Error {...props} onHide={() => this.onHide()} />
      if (props.success) return <Success {...props} onHide={() => this.onHide()} />
    })()

    const styles = {
      display: hide ? 'none' : 'block',
      position: 'fixed',
      zIndex: 9999,
      right: 0,
      left: 0,
      top: 0
    }

    return (
      <div style={styles}>{status}</div>
    )
  }
}

const Error = (props) => {
  return (
    <div className='layout horizontal center pa3 w-100' style={{ color: 'white', backgroundColor: '#F34F49' }}>
      <span className='f4'>Yikes!</span>
      <span className='pl3'>{props.error}</span>
      <span onClick={props.onHide} className={cls('f7 ml-auto pointer', props.fade && 'dn')}>✕</span>
    </div>
  )
}

const Success = (props) => {
  return (
    <div className='layout horizontal center pa3 w-100' style={{ color: 'white', backgroundColor: '#35C28C' }}>
      <span className='f4'>Woohoo!</span>
      <span className='pl2 f-14'>{props.success}</span>
      <span onClick={props.onHide} className={cls('c-FFFFFF f-14 ml-auto pointer', props.fade && 'dn')}>✕</span>
    </div>
  )
}

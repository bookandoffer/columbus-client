import { Component } from 'react'
import Link from 'next/link'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

    // onClick (e) {
    //     this.setState({
    //         clicked: !this.state.clicked
    //     })
    // }

    // <div className='f2 bg-blue' onClick={(e) => this.onClick(e)}>header - {this.state.clicked ? 'yes' : 'no'}</div>

  render (props) {
    return (
      <div className='layout horizontal pa2 center mb0 sysFont' style={{'height': '50px'}}>
        <Link href='/' className='link' style={{ textDecoration: 'none' }}><div className='b f5 mid-gray layout horizontal center'><img src='/static/globe.svg' style={{'height': '30px', 'margin-left': '25px', 'margin-right': '25px'}} />COLUMBUS</div></Link>
        <div className='ph3 f7 mid-gray' style={{'marginLeft': 'auto'}}>KURS EINSTELLEN</div>
        <div className='ph3 f7 mid-gray'>HILFE</div>
        <div className='ph3 f7 mid-gray'>REGISTRIEREN</div>
        <div className='ph3 f7 mid-gray'>LOGIN</div>
      </div>
    )
  }
}

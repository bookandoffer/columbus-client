import { Component } from 'react'

export default class Header extends Component {
    constructor (props) {
        super(props)
        this.state = {
            clicked: false
        }
    }

    onClick () {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    render (props) {
        return (
            <div className='f2 bg-gray' style={{ border: '1px solid blue' }} onClick={() => this.onClick()}>header - {this.state.clicked ? 'yes' : 'no'}</div>
        )
    }
}
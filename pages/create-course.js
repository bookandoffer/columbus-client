import Head from '../components/head'
import { Component } from 'react'
import store from 'store'

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (props) {
    return (
      <div>
        <Head title='Columbus | Create a course' />
      </div>
    )
  }
}

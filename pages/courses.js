import findCourses from '../lib/find-courses'
import Header from '../components/header'
import redirect from '../lib/redirect'
import Head from '../components/head'
import { Component } from 'react'
import Router from 'next/router'
import auth from '../lib/auth'
import get from 'dlv'

const alert = typeof window === 'undefined'
  ? console.error
  : window.alert

export default class Me extends Component {
  static async getInitialProps (ctx) {
    const query = get(ctx, 'query.query')
    const location = get(ctx, 'query.location')
    const date = get(ctx, 'query.date')

    // go back if we don't have a course id via ?course=...
    if (!query || !location || !date) return redirect(ctx, '/')

    const res = await findCourses({ query, location, date })
    if (res instanceof Error) {
      alert(res.message)
      // return redirect(ctx, '/')
    }
    
    return { courses: res.courses }
  }

  render () {
    return (
      <div>
        <Head title='Columbus | Course Results' />
        <pre><code>{JSON.stringify(this.props.courses, true, 2)}</code></pre>
      </div>
    )
  }
}

import loadCourse from '../lib/load-course'
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
    const courseId = get(ctx, 'query.id')

    // go back if we don't have a course id via ?course=...
    if (!courseId) return redirect(ctx, '/')

    const res = await loadCourse(courseId)
    if (res instanceof Error) {
      alert(res.message)
      return redirect(ctx, '/')
    } else if (!res.course) {
      alert('could not find the course you specified')
      return redirect(ctx, '/')
    }

    return { course: res.course }
  }

  render () {
    return (
      <div>
        <Head title='Columbus | Course Details' />
        <pre><code>{JSON.stringify(this.props.course, true, 2)}</code></pre>
      </div>
    )
  }
}

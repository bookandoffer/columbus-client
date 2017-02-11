import 'babel-polyfill'
import findCoursesByCategory from '../lib/find-courses-by-category'
import findCourses from '../lib/find-courses'
import Header from '../components/header'
import Footer from '../components/footer'
import redirect from '../lib/redirect'
import Head from '../components/head'
import { Component } from 'react'
import cookies from 'next-cookies'
import poss from 'poss'
import loadUser from '../lib/load-user'
import Router from 'next/router'
import StatusBar from '../components/status-bar'
import get from 'dlv'

function alert (message) {
  if (typeof window === 'undefined') {
    console.error(message)
  } else {
    StatusBar.setState({ error: message })
  }
}

export default class Me extends Component {
  static async getInitialProps (ctx) {
    const category = get(ctx, 'query.category')
    const where = get(ctx, 'query.where')
    const what = get(ctx, 'query.what')
    const when = get(ctx, 'query.when')
    const props = {}
    let res = null

    if (what && where && when) {
      res = await findCourses({ query: what, location: where, date: when })
    } else if (category) {
      res = await findCoursesByCategory({ category: category })
    } else {
      return redirect(ctx, '/')
    }

    if (!res || res instanceof Error) {
      alert(res.message)
      return redirect(ctx, '/')
    } else {
      props.courses = res.courses
    }

    const { token } = cookies(ctx)
    if (!token) return props
    const [ err, resp ] = await poss(loadUser(token))
    if (err || !resp || !resp.user) return props
    else props.user = resp.user

    return props
  }

  render () {
    const courses = this.props.courses
    return (
      <div className='layout vertical min-vh-100'>
        <Head title='bookandoffer | Course Results' />

        <Header {...this.props} />
        <StatusBar />
        <div className='m-auto pv6 w-100' style={{maxWidth: '1500px'}}>
          <div className='layout horizontal wrap'>
            {
            courses.length
              ? courses.map(course => <Course key={course.id} {...course} />)
              : <h2 className='sysFont pt4 fw3'>No courses found!</h2>
          }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  search (id) {
    Router.push(`/course?id=${encodeURIComponent(id)}`)
  }

  render () {
    const image = get(this.props, 'images.0') || 'http://law.depaul.edu/academics/study-abroad/berlin-germany/PublishingImages/Berlin-OberbaumBridge_1600.jpg'

    return (
      <div className='w-100 w-33-ns pa2'>
        <div className='aspect-ratio aspect-ratio--4x3 pointer w-100' onClick={() => this.search(this.props.id)}>
          <div className='aspect-ratio--object layout vertical'>
            <div className='flex cover layout horizontal' style={{ backgroundImage: `url(${image})` }}>
              <div className='bg-FD5C63 self-end mb3 ph2 layout horizontal' style={{height: '45px', width: '140px'}}>
                <span className='flex self-center white f3'>{this.props.price}</span>
                <span className='white self-center' style={{fontSize: '12px', marginTop: '5px'}}>CHF / Sitzung</span>
              </div>
              <img className='b--white ml-auto self-end' src='/static/course-logo.png' style={{border: '0px solid white', borderRadius: '50px', height: '50px', width: '50px', marginRight: '15px', marginBottom: '-25px'}} />
            </div>
            <div className='ph3 layout vertical sysFont justify-center' style={{height: '70px'}}>
              <span className='courseTextPrimary mb1' style={{fontSize: '14px', letterSpacing: '1px'}}>{this.props.title}</span>
              <span className='courseTextSecondary' style={{fontSize: '11px', letterSpacing: '1px'}}>{this.props.address + ', ' + this.props.country}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import 'babel-polyfill'
import findCoursesByCategory from '../lib/find-courses-by-category'
import findCourses from '../lib/find-courses'
import Header from '../components/header'
import Footer from '../components/footer'
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
    const category = get(ctx, 'query.category')
    const where = get(ctx, 'query.where')
    const what = get(ctx, 'query.what')
    const when = get(ctx, 'query.when')
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
    }

    return { courses: res.courses }
  }

  render () {
    const courses = this.props.courses
    return (
      <div className='layout vertical min-vh-100'>
        <Head title='bookandoffer | Course Results' />
        <Header />
        <div className='m-auto pv6 flex-1' style={{maxWidth: '1500px'}}>
          <div className='layout horizontal wrap justify-center '>
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
      <div className='pa3 pointer' onClick={() => this.search(this.props.id)}>
        <div className='layout horizontal justify-between flex h5 w5 sysFont' style={{height: '240px', width: '400px', backgroundImage: 'url(' + image + ')', backgroundSize: 'cover'}}>
          <div className='bg-FD5C63 self-end mb3 ph2 layout horizontal' style={{height: '45px', width: '140px'}}>
            <span className='flex self-center white f3'>{this.props.price}</span>
            <span className='white self-center' style={{fontSize: '12px', marginTop: '5px'}}>€ Gesamt</span>
          </div>
          <img className='b--white self-end' src='/static/course-logo.png' style={{border: '0px solid white', borderRadius: '50px', height: '50px', width: '50px', marginRight: '15px', marginBottom: '-25px'}} />
        </div>
        <div className='ph3 layout vertical sysFont justify-center' style={{height: '70px', width: '400px'}}>
          <span className='courseTextPrimary mb1' style={{fontSize: '14px', letterSpacing: '1px'}}>{this.props.title}</span>
          <span className='courseTextSecondary' style={{fontSize: '11px', letterSpacing: '1px'}}>{this.props.address + ', ' + this.props.country}</span>
        </div>
      </div>
    )
  }
}

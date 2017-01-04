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
    const what = get(ctx, 'query.what')
    const where = get(ctx, 'query.where')
    const when = get(ctx, 'query.when')

    // go back if we don't have a course id via ?course=...
    if (!what || !where || !when) return redirect(ctx, '/')

    const res = await findCourses({ query: what, location: where, date: when })

    if (res instanceof Error) {
      alert(res.message)
      return redirect(ctx, '/')
    }

    return { courses: res.courses }
  }

  render () {
    return (
      <div className = "">
        <Head title='Columbus | Course Results' />
        <Header />

        <div className = "layout horizontal justify-center wrap m-auto" style = {{maxWidth:"1500px"}}>
          {this.props.courses.map(course => <Course {...course} />)}
        </div>
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
    console.log(this.props)

    return (
      <div className = "pa3 pointer" onClick={() => this.search(this.props.id)}>
        <div className='layout horizontal justify-between flex h5 w5 sysFont' style = {{height: "240px", width: "400px",backgroundImage:"url(" + this.props.images[0] + ")",backgroundSize:"cover"}}>
          <div className = "bg-FD5C63 self-end mb3 ph2 layout horizontal" style = {{height:"45px",width:"140px"}}>
            <span className = "flex self-center white f3">{this.props.price}</span>
            <span className = "white self-center" style = {{fontSize:"12px",marginTop:"5px"}}>€ Gesamt</span>
          </div>
          <img className = "b--white self-end" src = "/static/course-logo.png" style = {{border:"0px solid white",borderRadius:"50px",height:"50px",width:"50px",marginRight:"15px",marginBottom:"-25px"}}/>
        </div>
        <div className = "ph3 layout vertical sysFont justify-center" style = {{height:"70px", width:"400px"}}>
          <span className = "courseTextPrimary mb1" style = {{fontSize:"14px",letterSpacing:"1px"}}>{this.props.title}</span>
          <span className = "courseTextSecondary" style = {{fontSize:"11px",letterSpacing:"1px"}}>{this.props.address + ", " + this.props.country}</span>
        </div>
      </div>
    )
  }
}

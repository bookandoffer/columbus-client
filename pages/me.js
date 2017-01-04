import Header from '../components/header'
import Head from '../components/head'
import { Component } from 'react'
import Router from 'next/router'
import graph from '../lib/graph'
import auth from '../lib/auth'
import Link from 'next/link'

export default class Me extends Component {
  static async getInitialProps (ctx) {
    const user = await auth(ctx)
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { user } = this.props
    return (
      <div>
        <Head title='Columbus | My courses' />
        <Header token={this.props.cookies && this.props.cookies.token} />
        <div className='subnav layout horizontal bg-484848'>
          <div className='m-auto pv3'>
            <a className='f6 c-FFFFFF mh3 link' href='#'>Deine Kurse</a>
            <a className='f6 c-FFFFFF mh3 link' href='#'>Profil</a>
          </div>
        </div>
        <div className='layout horizontal mt5 m-auto ph4' style={{maxWidth: '74rem'}}>
          <div className='layout vertical mt4'>
            <a className='mt3 c-484848 link b' href='#'>Dein Inserate</a>
            <a className='mt3 c-484848 link' href='#'>Meine Buchungen</a>
            <a className='mt3 c-484848 link' href='#'>Buchungsvoraussetzungen</a>
            <button className='mt4 btn-green' onClick={() => Router.push('/create-course')}>Neue Inserate hinzufügen</button>
          </div>
          <div className='courses'>
            { user && user.courses.map(course => <Course key={course.id} {...course} />) }
          </div>
        </div>
      </div>
    )
  }
}

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deleted: false
    }
  }

  async delete (id) {
    await graph(`
      mutation deleteCourse($id: ID!) {
        deleteCourse(id: $id){
          id
        }
      }
    `, { id })

    this.setState({ deleted: true })
  }

  render () {
    const props = this.props || {}
    const img = props.images && props.images[0]
    if (this.state.deleted) return null

    return (
      <div className='layout vertical flex mt4 ml4'>
        <div className='bg-EDEDED pa3 b'>{props.title}</div>
        <div className='layout horizontal pa3 b--light-gray ba'>
          { img
            ? <img src={img} className='db w-100' style={{ maxWidth: '18rem', height: '11.5rem' }} />
            : (
              <div className='thumbnail layout horizontal center bg-BBBBBB w-100' style={{ maxWidth: '18rem', height: '11.5rem' }}>
                <i className='material-icons c-FFFFFF f1 m-auto'>photo_camera</i>
              </div>
            )
          }
          <div className='layout vertical pa3'>
            <span className='mt2 mid-gray'>Zuletzt aktualistiert am 9. November 2016</span>
            <div className='layout horizontal mt4 wrap'>
              <Link href={`/course?id=${props.id}`}>
                <button className='ml3 btn-green layout horizontal center pointer'>
                  <i className='material-icons mr2'>pageview</i>
                  <span className='f6'>Vorschau</span>
                </button>
              </Link>
              <Link href={`/create-course?id=${props.id}`}>
                <button className='ml3 btn-gray layout horizontal center pointer'>
                  <i className='material-icons mr2'>edit</i>
                  <span className='f6'>Bearbeiten</span>
                </button>
              </Link>
              <button className='ml3 btn-alt layout horizontal center pointer br2' onClick={() => this.delete(props.id)}>
                <i className='material-icons mr2'>delete</i>
                <span className='f6'>Unlist natürlich</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

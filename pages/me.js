import Header from '../components/header'
import Head from '../components/head'
import { Component } from 'react'
import Router from 'next/router'
import auth from '../lib/auth'

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
        <div className='layout horizontal mw8 mt5 m-auto'>
          <div className='layout vertical'>
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
    this.state = {}
  }

  render () {
    const props = this.props || {}
    const img = props.images && props.images[0]

    return (
      <div className='layout vertical flex ml4'>
        <div className='bg-EDEDED pa3'>In Bearbeitung</div>
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
            <span className='b'>{props.title}</span>
            <span className='mt2 mid-gray'>Zuletzt aktualistiert am 9. November 2016</span>
            <div className='layout horizontal mt4'>
              <button className='btn'>Das Inserat fertigstellen</button>
              <button className='ml3 btn-gray'>Vorschau</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

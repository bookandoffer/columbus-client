import { Component } from 'react'
import Header from '../components/header'
import Head from '../components/head'
import Router from 'next/router'

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  search (e) {
    e.preventDefault()

    const { what, where, when } = this.state
    let errors = []

    if (!what) errors.push('Phai umfassen einen Kurs')
    if (!where) errors.push('müssen Sie ausfüllen, wo')
    if (!when) errors.push('Sie müssen in KHI zu füllen')
    if (errors.length) {
      alert(errors.join(', '))
      return
    }

    // ensure it's a valid Date
    const date = new Date(when)
    if (!validDate(date)) {
      alert('Datum ist nicht gültig')
      return
    }

    Router.push(`/courses?what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}&when=${encodeURIComponent(date.toISOString())}`)
  }

  render () {
    const what = this.state.what || ''
    const where = this.state.where || ''
    const when = this.state.when || ''

    return (
      <div>
        <Head title='Columbus' />
        <div className='w-100 center'>
          <Header />

          <div className='db background-banner layout horizontal center sysFont' style={{'backgroundImage': 'url(/static/Header-bg.png)'}}>
            <div className='m-auto' style={{'textAlign': 'center', 'width': '80%', 'marginTop': '-50px', 'maxWidth': '1200px'}}>
              <h1 className='white mt0 normal headerSize mb1'>Entdecke die Welt!</h1>
              <h2 className='white mt0 normal f3 pv0 mb4'>Finde den Kurs, der zu Dir passt!</h2>
              <h3 className='white mt0 normal f6 pv0 orange-yellow mb4' style={{'letterSpacing': '2px'}}>FINDE JETZT SPRACHKURSE, SPORTKURSE UND MEHR</h3>

              <form>
                <div className='bg-white mt0 m-auto layout horizontal flex searchBox' style={{'width': '100%', 'height': '80px', 'maxWidth': '1000px'}}>
                  <div className='flex layout vertical justify-center f6 pa3' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left'}}><span className='c-565656 pb2'>Welche Art Kurs suchst du?</span><span className='textSecondary'><input className='searchInput' value={what} onInput={(e) => this.setState({ what: e.target.value })} placeholder='Sprachkurs, Tanzkurs, ..' type='text' name='what' /></span></div>
                  <div className='flex layout vertical justify-center f6 pa3' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left'}}><span className='c-565656 pb2'>Wo</span><span className='textSecondary'><input className='searchInput' value={where} onInput={(e) => this.setState({ where: e.target.value })} placeholder='Stadt, Land, Region' type='text' name='where' /></span></div>
                  <div className='flex layout vertical justify-center f6 pa3' style={{'textAlign': 'left'}}><span className='c-565656 pb2'>Wann</span><span className='textSecondary'><input className='searchInput' placeholder='Datum oder Zeitraum' type='text' name='when' value={when} onInput={(e) => this.setState({ when: e.target.value })} /></span></div>
                  <div className='flex layout vertical justify-center items-end pr3'>
                    <button className='btn bn' style={{'height': '40px', 'borderRadius': '5px', 'width': '150px'}} onClick={(e) => this.search(e)}>Suche</button>
                  </div>
                </div>
              </form>

            </div>
            <div style={{'paddingBottom': '38.2%'}} />
          </div>
        </div>

        {/*

          some saved stuff

        <div className={cls('pa1', this.state.errors && 'error')}>{data.name}</div>
        <img width='112' className='pa5' src='https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png' alt='next.js' />
        <Link href="/course">Courses</Link>
        */}

        <div className='flex justify-center'>
          <div className='layout db vertical mv5 sysFont white regular f7' style={{height: '500px', width: '70%'}}>
            <div className='mv2 black f5' style={{color: '#4B4B4B'}}>Entdecke die Welt</div>
            <div className='layout horizontal flex-1'>
              <div className='flex-2 items-end ma1 tl flex pl2 pb2 pointer' style={{ backgroundImage: "url('/static/paris.jpg')", backgroundSize: 'cover' }}>Paris</div>
              <div className='layout vertical flex-1'>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/rome.jpg')", backgroundSize: 'cover' }}>Rom</div>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/lissabon.jpg')", backgroundSize: 'cover' }}>Lissabon</div>
              </div>
              <div className='layout vertical flex-1'>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/los angeles.jpg')", backgroundSize: 'cover' }}>Los Angeles</div>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/tokio.jpg')", backgroundSize: 'cover' }}>Tokio</div>
              </div>
            </div>
            <div className='layout horizontal flex-1'>
              <div className='layout vertical flex-1'>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/london.jpg')", backgroundSize: 'cover' }}>London</div>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/barcelona.jpg')", backgroundSize: 'cover' }}>Barcelona</div>
              </div>

              <div className='flex-2 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/new york.jpg')", backgroundSize: 'cover' }}>New York</div>
              <div className='layout vertical flex-1'>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/amsterdam.jpg')", backgroundSize: 'cover' }}>Amsterdam</div>
                <div className='flex-1 ma1 tl flex pl2 pb2 pointer items-end' style={{ backgroundImage: "url('/static/berlin.jpg')", backgroundSize: 'cover' }}>Berlin</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}

function validDate (d) {
  if (Object.prototype.toString.call(d) === '[object Date]') {
    if (isNaN(d.getTime())) {  // d.valueOf() could also work
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

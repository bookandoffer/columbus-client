import 'babel-polyfill'
import React, { Component } from 'react'
import Header from '../components/header'
import Head from '../components/head'
import Footer from '../components/footer'
import Router from 'next/router'
import loadUser from '../lib/load-user'
// import DatePicker from '../components/datepicker'
import DatePicker from 'react-datepicker'
import cookies from 'next-cookies'
import Link from 'next/link'
import poss from 'poss'
import get from 'dlv'

export default class Page extends Component {
  static async getInitialProps (ctx) {
    const { token } = cookies(ctx)
    if (!token) {}
    const [ err, res ] = await poss(loadUser(token))
    if (err || !res || !res.user) return {}
    return { user: res.user }
  }

  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  search (e) {
    e.preventDefault()

    const { what, where, when } = this.state

    const errors = {}
    if (!what) errors.what = 'Phai umfassen einen Kurs'
    if (!where) errors.where = 'müssen Sie ausfüllen, wo'
    if (!when) errors.when = 'Sie müssen in KHI zu füllen'
    if (!validDate(new Date(when))) errors.when = 'Datum ist nicht gültig'
    if (Object.keys(errors).length) return this.setState({ errors })

    Router.push(`/courses?what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}&when=${encodeURIComponent(new Date(when).toISOString())}`)
  }

  update (name, value) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({
      [name]: value,
      errors
    })
  }

  render () {
    const { user } = this.props
    const what = this.state.what || ''
    const where = this.state.where || ''
    const when = this.state.when || ''
    const errors = this.state.errors || {}

    return (
      <div>
        <Head title='bookandoffer' />
        <div className='w-100 center'>
          <Header user={user} />

          <div className='db background-banner layout horizontal center sysFont' style={{'backgroundImage': 'url(/static/Header-bg.jpg)'}}>
            <div className='m-auto' style={{'textAlign': 'center', 'width': '80%', 'marginTop': '-50px', 'maxWidth': '1200px'}}>
              <h1 className='white mt0 normal headerSize headerPos'>Finde den richtigen Kurs für dich</h1>
              <h3 className='white mt0 normal f6 pv0 mb5' style={{'letterSpacing': '2px'}}>EINE GROSSE AUSWAHL AN KURSEN UND AKTIVITÄTEN WARTEN AUF DICH</h3>

              <form>
                <div className='mt0 m-auto layout horizontal flex searchBox wrap' style={{'width': '100%', 'maxWidth': '1000px'}}>
                  <div className='bg-white flex layout vertical justify-center f6 pa4 pb2' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left'}}>
                    <span className='c-565656 pb2'>Welche Art Kurs suchst du?</span>
                    <span className='textSecondary'>
                      <input className='searchInput' value={what} onInput={(e) => this.update('what', e.target.value)} placeholder='Sprachkurs, Tanzkurs, ..' type='text' name='what' />
                    </span>
                    <span className='red f7 mt2'>{errors.what || '\u200B'}</span>
                  </div>
                  <div className='bg-white flex layout vertical justify-center f6 pa4 pb2' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left', 'borderTop': '1px solid #eeeeee'}}>
                    <span className='c-565656 pb2'>Wo</span>
                    <span className='textSecondary'>
                      <input className='searchInput' value={where} onInput={(e) => this.update('where', e.target.value)} placeholder='Stadt, Land, Region' type='text' name='where' />
                    </span>
                    <span className='red f7 mv1'>{errors.where || '\u200B'}</span>

                  </div>
                  <div className='bg-white flex layout vertical justify-center f6 pa4 pb2' style={{'textAlign': 'left', 'borderTop': '1px solid #eeeeee'}}>
                    <span className='c-565656 pb2'>Wann</span>
                    <span className='textSecondary'>
                      <ReactDatePicker value={when} onChange={(date) => this.update('when', date)} />
                    </span>
                    <span className='red f7 mt1'>{errors.when || '\u200B'}</span>
                  </div>

                  <div className='bg-white flex layout vertical justify-center items-end pr3 pv3' style={{'borderTop': '1px solid #eeeeee'}}>
                    <button className='btn bn' style={{'height': '40px', 'borderRadius': '5px', 'width': '150px'}} onClick={(e) => this.search(e)}>Suche</button>
                  </div>
                </div>
              </form>

            </div>
            <div style={{'paddingBottom': '38.2%'}} />
          </div>
        </div>

        <div className='flex w-70 m-auto pl2 mb4 mt6 helvetica c-484848' style={{'maxWidth': '1000px'}}>Finde den richtigen Kurs für dich - einfach online</div>
        <div className='mt3 mb3 layout w-70 m-auto horizontal wrap' style={{'maxWidth': '1000px'}}>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=language'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/language.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Sprachkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Englisch, Spanisch, Italienisch</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=fitness'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/fitness.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Fitnesskurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Crossfit, Aerobic</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=painting'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/painting.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Malkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Zeichnen für Einsteiger, Ölmalerei, Acryl</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=skiing'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/skiing.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Skikurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Profis</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=chess'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/chess.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Schachkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Fortgeschritten, Profis</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 categoryWidth'>
            <Link href='/courses?category=riding'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ zIndex: '0', backgroundImage: `url(/static/categories/riding.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Reitkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Kinderreitkurse, Einsteiger, Parcour</p>
                </div>
              </div>
            </Link>
          </div>

        </div>

        <div className='tc'>
          <Link href='/categories'><button className='btn bn mb5 fw2 f6' style={{'height': '40px', 'borderRadius': '5px', 'width': '150px'}}>Weitere Kurse</button></Link>
        </div>

        <div className='pa6 tl w-100 layout vertical mb5' style={{backgroundColor: '#F7F9FB'}}>
          <p className='f4 sysFont'>Was ist bookandoffer?</p>
          <div className='w3 sysFont' style={{border: '2px solid #FCBB08', height: '3px'}} />
          <p className='f5 fw2 courseTextPrimary'>bookandoffer ist eine Plattform, die es dir ermöglicht, einen passenden Kurs in deiner Nähe zu finden. Du kannst unter den vielen Anbietern wählen und den passenden Kurs aussuchen. Für Anbieter ist bookandoffer die ideale Plattform um Kurse und Angebote bekanntzumachen. Deine Kurse werden schneller gefunden und du profitierst von einer großen Gemeinschaft.</p>
        </div>

        <Footer />

      </div>
    )
  }
}

var ReactDatePicker = React.createClass({
  displayName: 'ReactDatePicker',

  getInitialState: function () {
    return {
      startDate: ''
    }
  },

  handleChange: function (date) {
    this.setState({
      startDate: date
    })
    this.props.onChange(date.toDate())
    console.log(date)
  },

  render: function () {
    return <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange.bind(this)}
      className='bn textSecondary sysFont pointer datePicker c-484848'
      placeholderText='Wählen Sie ein Datum'
        />
  }
})

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

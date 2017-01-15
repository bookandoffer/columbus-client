import { Component } from 'react'
import Header from '../components/header'
import Head from '../components/head'
import Footer from '../components/footer'
import Router from 'next/router'
import Category from '../components/categories'
// import DatePicker from '../components/datepicker'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Link from 'next/link'

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

    console.log(when);

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
        <Head title='bookandoffer' />
        <div className='w-100 center'>
          <Header />

          <div className='db background-banner layout horizontal center sysFont' style={{'backgroundImage': 'url(/static/Header-bg.png)'}}>
            <div className='m-auto' style={{'textAlign': 'center', 'width': '80%', 'marginTop': '-50px', 'maxWidth': '1200px'}}>
              <h1 className='white mt0 normal headerSize mb5'>Finde den richtigen Kurs für dich</h1>
              {/* <h2 className='white mt0 normal f3 pv0 mb4'>EINE GROSSE AUSWAHL AN KURSEN UND AKTIVITÄTEN WARTEN AUF DICH</h2> */}
              <h3 className='white mt0 normal f6 pv0 orange-yellow mb4' style={{'letterSpacing': '2px'}}>EINE GROSSE AUSWAHL AN KURSEN UND AKTIVITÄTEN WARTEN AUF DICH</h3>

              <form>
                <div className='bg-white mt0 m-auto layout horizontal flex searchBox' style={{'width': '100%', 'height': '80px', 'maxWidth': '1000px'}}>
                  <div className='flex layout vertical justify-center f6 pa3' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left'}}><span className='c-565656 pb2'>Welche Art Kurs suchst du?</span><span className='textSecondary'><input className='searchInput' value={what} onInput={(e) => this.setState({ what: e.target.value })} placeholder='Sprachkurs, Tanzkurs, ..' type='text' name='what' /></span></div>
                  <div className='flex layout vertical justify-center f6 pa3' style={{'borderRight': '1px solid #eeeeee', 'textAlign': 'left'}}><span className='c-565656 pb2'>Wo</span><span className='textSecondary'><input className='searchInput' value={where} onInput={(e) => this.setState({ where: e.target.value })} placeholder='Stadt, Land, Region' type='text' name='where' /></span></div>
                  {/* <div className='flex layout vertical justify-center f6 pa3' style={{'textAlign': 'left'}}><span className='c-565656 pb2'>Wann</span><span className='textSecondary'><input className='searchInput' placeholder='Datum oder Zeitraum' type='text' name='when' value={when} onInput={(e) => this.setState({ when: e.target.value })} /></span></div> */}
                  <div className='flex layout vertical justify-center f6 pa3' style={{'textAlign': 'left'}}><span className='c-565656 pb2'>Wann</span><span className='textSecondary'><ReactDatePicker value = {when} onChange={(date) => this.setState({ when: date })} /></span></div>

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

        <div className = "flex w-70 m-auto pl2 mb4 mt6 helvetica c-484848" style = {{"maxWidth":"1000px"}}>Finde den richtigen Kurs für dich - einfach online</div>
        <div className='mt3 mb5 layout w-70 m-auto horizontal wrap' style = {{"maxWidth":"1000px"}}>
          <div className='pa2 w-50'>
            <Link href='/courses?category=language'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/language.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Sprachkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Englisch, Spanisch, Italienisch</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=computer'>
              <div className='aspect-ratio aspect-ratio--16x9 pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/computer.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Computerkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Word, Excel, iPad</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=golf'>
              <div className='aspect-ratio aspect-ratio--16x9 pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/golf.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Golfkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Platzreife, Fortgeschritten</p>
                </div>
              </div>
            </Link>

          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=golf'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/painting.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Malkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Zeichnen für Einsteiger, Ölmalerei, Acryl</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=painting'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/skiing.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Skikurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Profis</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=cooking'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/cooking.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Kochkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Fortgeschritten, Profis</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=yoga'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/yoga.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Yogakurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Hatha Yoga, Einsteiger, Abendkurse</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=chess'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/chess.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Schachkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Fortgeschritten, Profis</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='pa2 w-50'>
            <Link href='/courses?category=riding'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/riding.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Reitkurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Kinderreitkurse, Einsteiger, Parcour</p>
                </div>
              </div>
            </Link>
          </div>

          <div className='pa2 w-50'>
            <Link href='/courses?category=fitness'>
              <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                <div className='aspect-ratio--object pa3 cover layout vertical justify-end' style={{ backgroundImage: `url(/static/categories/fitness.png)` }}>
                  <h3 className='c-FFFFFF fw4 f3 mb0'>Fitnesskurse</h3>
                  <p className='c-FFFFFF f6 fw2 mv1'>Crossfit, Aerobic</p>
                </div>
              </div>
            </Link>
          </div>
        </div>


        <div className='pa6 tl w-100 layout vertical mb5' style = {{backgroundColor:"#F7F9FB"}}>
          <p className = "f4 sysFont">Was ist BookAndOffer?</p>
          <div className = "w3 sysFont" style = {{border:"2px solid #FCBB08",height:"3px"}}/>
          <p className = "f5 fw2 courseTextPrimary">BookAndOffer ist eine Platform, die es dir ermöglicht einen passenden Kurs in deiner Nähe zu finden. Du kannst unter den vielen Anbieter wählen und den passenden Kurs raussuchen. Für Anbieter ist BookAndOffer die ideale Plattform um Kurse und Angebote bekannt zumachen. Deine Kurse werden schneller gefunden und profitierst von einer großen Gemeinschaft.</p>
        </div>

        <Footer />

      </div>
    )
  }
}

var ReactDatePicker = React.createClass({
  displayName: 'ReactDatePicker',

  getInitialState: function() {
    return {
      startDate: ""
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
    this.props.onChange(date.toDate());
    console.log(date);
  },

  render: function() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
        className = 'bn textSecondary sysFont pointer datePicker c-484848'
        placeholderText='Wählen Sie ein Datum'
        />;
  }
});

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

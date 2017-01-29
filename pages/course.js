import 'babel-polyfill'
import loadCourse from '../lib/load-course'
import DatePicker from 'react-datepicker'
import Header from '../components/header'
import Footer from '../components/footer'
import redirect from '../lib/redirect'
import Head from '../components/head'
import StatusBar from '../components/status-bar'
import send from '../lib/mailgun'
import { Component } from 'react'
import Portal from 'react-portal'
import Router from 'next/router'
import cookies from 'next-cookies'
import moment from 'moment'
import poss from 'poss'
import isNumber from 'is-number'
import loadUser from '../lib/load-user'
import isEmail from 'email-regex'
import cls from 'classnames'
import fecha from 'fecha'
import get from 'dlv'

var data = {
  'name': 'Standardkur, NL, A1',
  'address': 'Amsterdam, NH, Niederlande',
  'schoolType': 'Sprachschule',
  'learningType': 'Gruppenunterricht',
  'numLessions': '20 Lektionen/Woche',
  'maxStudents': 10,
  'equipment': ['Wi-Fi', 'Beamer', 'Laptop (Windows)', 'Wasser', 'Kaffee', 'Obst'],
  'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos cumque dolore, quidem, nobis doloremque placeat, laudantium ex, totam veritatis suscipit incidunt? Iure assumenda fuga quo facere modi fugiat similique, ex!',
  'language': 'Niederländisch',
  'image': 'http://dropbox.com/asdjflkajsdf.png',
  'price': 35
}

var staticData = {
  equipment: ['Wi-Fi', 'Beamer', 'Laptop (Windows)', 'Wasser', 'Kaffee', 'Obst'],
  images: []
}

function alert (message) {
  if (typeof window === 'undefined') {
    console.error(message)
  } else {
    StatusBar.setState({ error: message })
  }
}

export default class Me extends Component {

  static async getInitialProps (ctx) {
    const courseId = get(ctx, 'query.id')
    const props = {}

    // go back if we don't have a course id via ?course=...
    if (!courseId) return redirect(ctx, '/')

    const res = await loadCourse(courseId)
    if (res instanceof Error) {
      alert(res.message)
      return redirect(ctx, '/')
    } else if (!res.course) {
      alert('could not find the course you specified')
      return redirect(ctx, '/')
    } else {
      props.course = res.course
    }

    const { token } = cookies(ctx)
    if (!token) return props
    const [ err, resp ] = await poss(loadUser(token))
    if (err || !resp || !resp.user) return props
    else props.user = resp.user

    return props
  }

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(),
      errors: {}
    }
  }

  async sendEmail (e) {
    e.preventDefault()

    const startDate = this.state.startDate
    const numWeeks = this.state.numWeeks
    const email = this.state.email
    const textInfo = this.state.textInfo

    const errors = {}
    if (!email || !isEmail({ exact: true }).test(email)) errors.email = 'Bitte geben sie eine gültige E-Mail'
    if (!startDate || !validDate(new Date(startDate))) errors.startDate = 'Datum ist nicht gültig'
    if (!numWeeks || !isNumber(numWeeks)) errors.numWeeks = 'Bitte gebe eine Nummer ein'
    if (Object.keys(errors).length) return this.setState({ errors })

    var data = {
      from: 'info@bookandoffer.com',
      to: this.props.course.user.email,
      subject: "You've got a new student!",
      text: `${this.state.email} would like to take ${this.props.course.title} on ${fecha.format(new Date(startDate), 'mediumDate')} for ${numWeeks} hours. If the inquirer left a note it will appear here: ${textInfo}. Please reply to this email to coordinate further!`,
      replyTo: this.state.email
    }

    await send(data)

    Router.push('/thanks')
  }

  render () {
    const data = Object.assign({}, staticData, this.props.course)
    const image = get(data, 'images.0') || 'http://law.depaul.edu/academics/study-abroad/berlin-germany/PublishingImages/Berlin-OberbaumBridge_1600.jpg'
    const startDate = this.state.startDate || new Date()
    const errors = this.state.errors || {}

    var evenEquipment = []
    for (var i = 0; i < data['equipment'].length; i += 2) {
      evenEquipment.push(<span key={i}>{data['equipment'][i]}</span>)
    }
    var oddEquipment = []
    for (var i = 1; i < data['equipment'].length; i += 2) {
      oddEquipment.push(<span key={i}>{data['equipment'][i]}</span>)
    }

    return (

      <div className='course-page'>
        <Head title='Columbus | Course Details' />
        <StatusBar />
        <Header {...this.props} />

        <div className='w-100 flex justify-end items-end' style={{height: '500px', backgroundImage: 'url(' + image + ')', backgroundSize: 'cover'}}>

          <div className='bg-white layout vertical z-1 course-sidebar' style={{height: '470px', width: '300px'}}>
            <div className='layout horizontal items-center ph3 sysFont justify-between' style={{height: '40px', backgroundColor: '#4A4C4C'}}>
              <span className='white f6'>{data.price} CHF </span>
              <span className='white f6'>Stunde </span>
            </div>
            <div className='flex sysFont pa3 layout vertical' style={{borderRight: '1px solid #E4E7E7', borderLeft: '1px solid #E4E7E7', borderBottom: '1px solid #E4E7E7'}}>
              <form>

                <label htmlFor='email'>
                  <div className='courseTextPrimary layout horizontal center'>
                    <span className={cls('f6', errors.email && 'red')}>Email</span>
                    <span className='f7 red ml-auto'>{errors.email}</span>
                  </div>
                  <input className={cls('mt2 mb3 transactionInput', errors.email && 'b--red')} id='email' style={{width: '100%', height: '36px', border: '1px solid #686666', borderRadius: '3px'}} type='text' value={this.state.email} onInput={(e) => this.setState({ email: e.target.value })} />
                </label>

                <label htmlFor='startDate'>
                  <div className='courseTextPrimary layout horizontal center'>
                    <span className={cls('f6', errors.startDate && 'red')}>Startdatum</span>
                    <span className='f7 red ml-auto'>{errors.startDate}</span>
                  </div>
                  <DatePicker id='startDate' selected={moment(startDate)} onChange={(date) => this.setState({ startDate: date.format('l') })} className='mt2 mb3 transactionInput course-page-date-picker' style={{width: '100%', height: '36px', border: '1px solid #686666', borderRadius: '3px'}} placeholderText='10/1/2017' />
                </label>

                <label htmlFor='numWeeks'>
                  <div className='courseTextPrimary layout horizontal center'>
                    <span className={cls('f6', errors.numWeeks && 'red')}>Anzahl Stunden</span>
                    <span className='f7 red ml-auto'>{errors.numWeeks}</span>
                  </div>
                  <input className={cls('mt2 mb3 transactionInput', errors.numWeeks && 'b--red')} id='numWeeks' style={{ width: '100%', height: '36px', border: '1px solid #686666', borderRadius: '3px' }} min='0' type='number' value={this.state.numWeeks} onInput={(e) => this.setState({ numWeeks: parseInt(e.target.value, 10) })} />
                </label>

                <label htmlFor='textInfo'>
                  <div className='courseTextPrimary layout horizontal center'>
                    <span className='f6'>Notiz (optional)</span>
                  </div>
                  <textarea rows='2' maxLength='500' id='textInfo' className='mt2 transactionInput' style={{width: '100%', border: '1px solid #686666', borderRadius: '3px'}} value={this.state.textInfo} onInput={(e) => this.setState({ textInfo: e.target.value })} />
                </label>

                <div className='flex layout vertical mt4'>
                {/*
                  <div className='layout courseTextPrimary horizontal ph3 items-center justify-between' style={{height: '35px', borderBottom: '1px solid #E4E7E7'}}>
                    <span>{this.state.numWeeks ? data.price + ' € x ' + this.state.numWeeks + ' Wochen' : '-'}</span>
                    <span>{this.state.numWeeks ? data.price * this.state.numWeeks + '€' : '0€'}</span>
                  </div>
                  <div className='layout courseTextPrimary horizontal ph3 items-center justify-between' style={{height: '35px', borderBottom: '1px solid #E4E7E7'}}>
                    <span>Service-Gebühr</span>
                    <span>40€</span>
                  </div>
                  <div className='layout courseTextPrimary horizontal ph3 items-center justify-between' style={{height: '35px', borderBottom: '1px solid #E4E7E7'}}>
                    <span>Gesamtsumme</span>
                    <span>{this.state.numWeeks ? data.price * this.state.numWeeks + 40 + '€' : '0€'}</span>
                  </div>
                */}
                  <button className='btn mt3 fw7' onClick={(e) => this.sendEmail(e)}>Buchung anfragen</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='course-content'>
          <div className='w-100 layout horizontal sysFont pb4'>
            <div className='layout horizontal center wrap w-100 course-content-title'>
              <div className='w-33-ns w-100 layout vertical center pt3 pb5'>
                <div className='w-two-thirds-ns w-100 pa3' style={{height: '200px'}}>
                  <div className='flex h-100' style={{backgroundImage: "url('/static/course-logo.png')", backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}} />
                </div>
                <div className='flex justify-center courseTextSecondary items-start'>
                  Talentinstituut
                </div>
              </div>
              <div className='pl3'>
                <div className='layout vertical'>
                  <span className='flex items-end f3 courseTextPrimary'>{data['title']}</span>
                  <span className='flex items-start f7 courseTextSecondary pt1'>{data['address']}</span>
                </div>
                <div className='layout horizontal w-100 wrap'>
                  <div className='items-center layout vertical ma3'>
                    <img src='/static/icons/house-icon.png' className='mw3' />
                    <div className='flex f7 courseTextSecondary'>{data['type']}</div>
                  </div>
                  <div className='items-center layout vertical ma3'>
                    <img src='/static/icons/people-icon.png' className='mw3' />
                    <div className='flex f7 courseTextSecondary'>Gruppenunterricht</div>
                  </div>
                  <div className='items-center layout vertical ma3'>
                    <img src='/static/icons/door-icon.png' className='mw3' />
                    <div className='flex f7 courseTextSecondary'>{data['duration']} Stunden/Woche</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{borderBottom: '2px solid #F1F1F1', marginLeft: '-20%' }} />

          <div className='sysFont pa4' style={{maxWidth: '70%'}}>
            <p className='f4 fw7 courseTextPrimary'>Über dieses Inserat</p>
            <p className='f5 courseTextSecondary'>{data['description']}</p>
          </div>
          <div style={{borderBottom: '2px solid #FAFAFA', marginLeft: '-20%' }} />

          <div className='sysFont pa4'>
            <div className='layout horizontal wrap mw7'>
              <div className='w5 courseTextSecondary fw7 pb3' style={{fontSize: '1.1rem'}}>Der Unterricht</div>
              <div className='layout horizontal flex-1'>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  <span>Gruppenunterricht</span>
                  <span>Max Teilnehmer: {data['groupSize']}</span>
                </div>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  <span>Stunden / Woche: {data['duration']}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{borderBottom: '2px solid #FAFAFA', marginLeft: '-20%' }} />

          <div className='sysFont pa4'>
            <div className='layout horizontal wrap mw7'>
              <div className='w5 courseTextSecondary fw7 pb3' style={{fontSize: '1.1rem'}}>Ausstattung</div>
              <div className='layout horizontal flex-1'>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  {evenEquipment}
                </div>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  {oddEquipment}
                </div>
              </div>
            </div>
          </div>
          <div style={{borderBottom: '2px solid #FAFAFA', marginLeft: '-20%' }} />

          {/*
          <div className='w-100 sysFont pa4'>
            <div className='layout horizontal wrap pb5'>
              <div className='w5 courseTextSecondary fw7' style={{fontSize: '1.1rem'}}>Sprache</div>
              <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
                {data['language']}
              </div>
            </div>
          </div>
          <div style={{borderBottom: '2px solid #FAFAFA', marginLeft: '-20%' }} />

          <div className='w-100 sysFont pa4'>
            <div className='layout horizontal wrap'>
              <div className='w5 courseTextSecondary fw7 pb3' style={{fontSize: '1.1rem'}}>Sprachniveau</div>
              <div className='layout horizontal flex-1 mw6'>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='a1' /> A1</label>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='b1' /> B1</label>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='c1' /> C1</label>
                </div>
                <div className='flex layout vertical courseTextSecondary f6 ph3' style={{lineHeight: '2'}}>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='a2' /> A2</label>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='b2' /> B2</label>
                  <label className='db w-33 ph3'><input type='radio' name='level' value='c2' /> C2</label>
                </div>
              </div>
            </div>
          </div>
          */}
          <div style={{borderBottom: '2px solid #FAFAFA', marginLeft: '-20%' }} />

        </div>
        <Footer />
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

import countries from '../lib/countries/index.json'
import Header from '../components/header'
import defaults from 'lodash.defaults'
import Head from '../components/head'
import { Component } from 'react'
import assign from 'deep-assign'
import store from '../lib/store'
import Router from 'next/router'
import auth from '../lib/auth'
import Link from 'next/link'
import get from 'dlv'

export default class Page extends Component {
  static async getInitialProps (ctx) {
    const user = await auth(ctx)
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {
      course: store.get('course')
    }
    this.onstorage = this.onStorage.bind(this)
  }

  onStorage (e) {
    this.setState({
      [e.key]: e.newValue
    })
  }

  componentDidMount () {
    store.subscribe(this.onstorage)
  }

  componentWillUnmount () {
    store.unsubscribe(this.onstorage)
  }

  render () {
    return (
      <div>
        <Head title='Columbus | Create a course' />
        <Header {...this.props} />
        <div>
          <Routes {...this.props} {...this.state} />
        </div>
      </div>
    )
  }
}

function Routes (props) {
  const step = get(props, 'url.query.step') || '1'
  switch (step) {
    case '1': return <Section1 {...props} step={step} />
    case '2': return <CourseType {...props} step={step} />
    case '3': return <CourseLocation {...props} step={step} />
    case '4': return <Section2 {...props} step={step} />
    case '5': return <ImageUpload {...props} step={step} />
    case '6': return <CourseDescription {...props} step={step} />
    case '7': return <CourseTitle {...props} step={step} />
    case '8': return <CourseDuration {...props} step={step} />
  }

  return null
}

class Section1 extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex'>
          <h1 className=''>Biete Deine Kurse bei Columbus an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
            <Link href={`/create-course?step=${step}`}>
              <button className='btn-green mt3'>Fortfahren</button>
            </Link>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Title</span>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalendar, Preis</span>
          </div>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

class CourseType extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const type = get(this.props, 'course.type') || 'LANGUAGE'
    const types = {
      LANGUAGE: 'Sprachkurs',
      DANCE: 'Tanzkurs',
      PAINTING: 'Malerei Kurs'
    }

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1>Biete Deine Kurse bei Columbus an!</h1>
        <select value={type} className='mt5' onChange={(e) => update('course', { type: e.target.value })}>
          {Object.keys(types).map(t => (
            <option key={t} value={t}>{types[t]}</option>
          ))}
        </select>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn'>Weiter</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class CourseLocation extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const location = defaults(get(this.props, 'course.location') || {}, {
      country: 'DE',
      address: '',
      addressSecondary: '',
      city: '',
      postal: ''
    })

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1>Wo befindet sich der Ort, an dem der Unterricht stattfindet</h1>
        <label htmlFor='land' className='mt5' >
          <div className='f7 mid-gray'>Land</div>
          <select value={location.country} className='w-100' onChange={(e) => update('course', { location: { country: e.target.value } })}>
            {Object.keys(countries).map(c => (
              <option key={countries[c]} value={countries[c]}>{c}</option>
            ))}
          </select>
        </label>

        <label htmlFor='address' className='mt4' >
          <div className='f7 mid-gray'>Strabe und Hausnummer</div>
          <input type='text' name='address' value={location.address} className='w-100' onInput={(e) => update('course', { location: { address: e.target.value } })} />
        </label>

        <label htmlFor='addressSecondary' className='mt4' >
          <div className='f7 mid-gray'>Zugangscode, Wohnung, Stockwerk, usw. (optional)</div>
          <input type='text' name='addressSecondary' value={location.addressSecondary} className='w-100' onInput={(e) => update('course', { location: { addressSecondary: e.target.value } })} />
        </label>

        <div className='layout horizontal'>
          <label htmlFor='city' className='mr2 mt4 w-100' >
            <div className='f7 mid-gray'>Stadt</div>
            <input type='text' name='city' value={location.city} className='w-100' onInput={(e) => update('course', { location: { city: e.target.value } })} />
          </label>
          <label htmlFor='postal' className='ml2 mt4 w-100' >
            <div className='f7 mid-gray'>Postleitzahl</div>
            <input type='text' name='postal' value={location.postal} className='w-100' onInput={(e) => update('course', { location: { postal: e.target.value } })} />
          </label>
        </div>

        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn'>Weiter</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class Section2 extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex'>
          <h1 className=''>Biete Deine Kurse bei Columbus an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Title</span>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn-green mt3'>Fortfahren</button>
            </Link>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalendar, Preis</span>
          </div>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

class ImageUpload extends Component {
  openUpload () {
    const url = prompt('Bitte geben Sie eine URL zu einem Bild ein')
    if (!url) return

    const images = (get(store.get('course'), 'images') || []).concat(url)
    update('course', { images: images })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const images = get(this.props, 'course.images') || []

    return (
      <div className='mw7 m-auto mt5 layout vertical'>
        <h1 className='mw6 m-auto'>Zeige deihen Gasten wie dein Unterrichtsort aussieht!</h1>
        <div className='mt4 layout horizontal b--dotted b--light-gray ba1 ph4 pv6 pointer' style={{ backgroundImage: 'url(/static/rect.svg) '}} onClick={() => this.openUpload()}>
          <button className='btn layout horizontal center m-auto'>
            <i className='material-icons mr3'>cloud_upload</i>
            <span>Fotos hochladen</span>
          </button>
        </div>
        <div className='mt4'>
          {images.map(src => (
            <img src={src} alt={src} key={src} className='w-100' />
          ))}
        </div>
        <div className='layout horizontal bt b--light-gray center mv4 pt4 mw6 w-100 m-auto'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              { images.length ? <button className='btn'>Weiter</button> : <button className='btn-gray'>Überspringen</button> }
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class CourseDescription extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const description = get(this.props, 'course.description') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1>Fang an, deine Beschreibung zu erstellen</h1>
        <input type='text' value={description} onInput={(e) => update('course', { description: e.target.value })} placeholder='Du wirst den Unterricht bei mir lieben, weil' />
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn'>Weiter</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class CourseTitle extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const title = get(this.props, 'course.title') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1>Gib deinem Lehrangebot einen Titel</h1>
        <input type='text' value={title} onInput={(e) => update('course', { title: e.target.value })} placeholder='Titel dieses Kurses' />
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn'>Weiter</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class CourseDuration extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const title = get(this.props, 'course.title') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1>Gib deinem Lehrangebot einen Titel</h1>
        <input type='text' value={title} onInput={(e) => update('course', { title: e.target.value })} placeholder='Titel dieses Kurses' />
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn'>Weiter</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function update (key, value) {
  const existing = store.get(key)
  if (Array.isArray(existing)) {

  }
  store.set(key, assign({}, existing, value))
}

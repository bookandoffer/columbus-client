import 'babel-polyfill'
import countries from '../lib/countries/index.json'
import StatusBar from '../components/status-bar'
import loadCourse from '../lib/load-course'
import DatePicker from 'react-datepicker'
import Header from '../components/header'
import upsertCourse from '../lib/upsert-course'
import picker from '../lib/file-picker'
import defaults from 'lodash.defaults'
import redirect from '../lib/redirect'
import Head from '../components/head'
import { Component } from 'react'
import graph from '../lib/graph'
import Link from 'next/link'
import store from '../lib/store'
import isNumber from 'is-number'
import Router from 'next/router'
import auth from '../lib/auth'
import moment from 'moment'
import get from 'dlv'
import superagent from 'superagent'
import poss from 'poss'
import cls from 'classnames'

function alert (message) {
  if (typeof window === 'undefined') {
    console.error(message)
  } else {
    StatusBar.setState({ error: message })
  }
}

export default class Page extends Component {
  static async getInitialProps (ctx) {
    const user = await auth(ctx)

    // do we have a course id already?
    // @NOTE this will overwrite existing (unfinished) course
    if (ctx.query.id) {
      const res = await loadCourse(ctx.query.id)
      if (res instanceof Error) {
        alert(res.message)
        return redirect(ctx, '/me')
      } else if (!res.course) {
        alert('could not find the course you specified')
        return redirect(ctx, '/me')
      }

      store.set('course', res.course)
    }

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
        <Head title='bookandoffer | Create a course' />
        <StatusBar />
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
    case '8': return <Section3 {...props} step={step} />
    case '9': return <CourseDuration {...props} step={step} />
    case '10': return <CoursePrice {...props} step={step} />
    case '11': return <CourseSize {...props} step={step} />
    case '12': return <CourseSchedule {...props} step={step} />
    case '13': return <Section4 {...props} step={step} />
  }

  return null
}

class Section1 extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex'>
          <h1 className='h-1'>Biete Deine Kurse bei bookandoffer an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn-green mt3'>Fortfahren</button>
            </Link>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Titel</span>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalender, Preis</span>
          </div>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

class CourseType extends Component {
  componentWillMount () {
    update('course', { type: 'LANGUAGE' })
  }

  nextPage () {
    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const type = get(this.props, 'course.type') || 'LANGUAGE'
    const types = {
      COMPUTER: 'ComputerKurse',
      GOLF: 'Golfkurse',
      PAINTING: 'Malkurse',
      SKI: 'Skikurse',
      COOKING: 'Kochkurse',
      YOGA: 'Yogakurse',
      CHESS: 'Schachkurse',
      RIDING: 'Reitkurse',
      LANGUAGE: 'Sprachkurse',
      FITNESS: 'Fitnesskurse'
    }

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1 sysFont'>Biete Deine Kurse bei bookandoffer an!</h1>
        <select value={type} className='mt5 select' onChange={(e) => update('course', { type: e.target.value })}>
          {Object.keys(types).map(t => (
            <option key={t} value={t}>{types[t]}</option>
          ))}
        </select>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class CourseLocation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  componentWillMount () {
    update('course', { country: 'DE' })
  }

  nextPage () {
    const course = store.get('course')
    const address = get(course, 'address')
    const city = get(course, 'city')
    const postal = get(course, 'postal')
    const errors = {}

    if (!address) errors.address = 'Bitte geben Sie eine Adresse an'
    if (!city) errors.city = 'Bitte geben Sie eine Stadt ein'
    if (!postal) errors.postal = 'Postleitzahl erforderlich'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const { errors } = this.state || {}

    const step = Number(get(this.props, 'step'))
    const location = defaults(get(this.props, 'course') || {}, {
      country: 'DE',
      address: '',
      addressSecondary: '',
      city: '',
      postal: ''
    })

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Wo befindet sich der Ort, an dem der Unterricht stattfindet</h1>
        <label htmlFor='land' className='mt5' >
          <div className='f7 fw4 mb1 ml1'>Land</div>
          <select value={location.country} className='w-100 select' onChange={(e) => update('course', { country: e.target.value })}>
            {Object.keys(countries).map(c => (
              <option key={countries[c]} value={countries[c]}>{c}</option>
            ))}
          </select>
        </label>

        <label htmlFor='address' className='mt4' >
          <div className='f7 fw4 mb1 ml1 layout horizontal'>
            <span className={cls(errors.address && 'red')}>Straße und Hausnummer</span>
            <span className={cls('ml-auto red', !errors.address && 'dn')}>{errors.address}</span>
          </div>
          <input type='text' name='address' value={location.address} className={cls('w-100 input', errors.address && 'b--red')} onInput={(e) => this.update('address', e)} />
        </label>

        <label htmlFor='addressSecondary' className='mt4' >
          <div className='f7 fw4 mb1 ml1'>Zugangscode, Wohnung, Stockwerk, usw. (optional)</div>
          <input type='text' name='addressSecondary' value={location.addressSecondary} className='w-100 input' onInput={(e) => update('course', { addressSecondary: e.target.value })} />
        </label>

        <div className='layout horizontal'>
          <label htmlFor='city' className='mr2 mt4 w-100' >
            <div className='f7 fw4 mb1 ml1 layout horizontal'>
              <span className={cls(errors.city && 'red')}>Stadt</span>
              <span className={cls('ml-auto red', !errors.city && 'dn')}>{errors.city}</span>
            </div>
            <input type='text' name='city' value={location.city} className={cls('w-100 input', errors.address && 'b--red')} onInput={(e) => this.update('city', e)} />
          </label>
          <label htmlFor='postal' className='ml2 mt4 w-100' >
            <div className='f7 fw4 mb1 ml1 layout horizontal'>
              <span className={cls(errors.postal && 'red')}>Postleitzahl</span>
              <span className={cls('ml-auto red', !errors.postal && 'dn')}>{errors.postal}</span>
            </div>
            <input type='text' name='postal' value={location.postal} className={cls('w-100 input', errors.address && 'b--red')} onInput={(e) => this.update('postal', e)} />
          </label>
        </div>

        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
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
          <h1 className=''>Biete Deine Kurse bei bookandoffer an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
            <Link href={`/create-course?step=1`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Titel</span>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn-green mt3'>Fortfahren</button>
            </Link>
          </div>
          <div className='c-BBBBBB layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalender, Preis</span>
          </div>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

class ImageUpload extends Component {
  constructor (props) {
    super(props)
    let images = get(store.get('course'), 'images') || []
    this.state = {
      images: images.map(img => { return { uri: img } }),
      uploading: false
    }
  }

  async nextPage () {
    const files = this.state.images.filter(img => !!img.file).map(img => img.file)
    const saved = this.state.images.filter(img => !img.file).map(img => img.uri)
    const step = Number(get(this.props, 'step'))

    if (!files.length) {
      update('course', { images: saved })
      Router.push(`/create-course?step=${step + 1}`)
      return
    }

    this.setState({ uploading: true })
    const [ err, urls ] = await poss(Promise.all(files.map(async file => {
      const form = new window.FormData()
      form.append('data', file)
      const res = await superagent.post('https://api.graph.cool/file/v1/cixap15jy31av0111cidov8hf').send(form)
      if (res.ok) return res.body.url
      else throw new Error('unable to upload file')
    })))

    this.setState({ uploading: false })
    if (err) return alert('Unable to upload images at this time')

    update('course', { images: saved.concat(urls) })
    Router.push(`/create-course?step=${step + 1}`)
  }

  async openUpload () {
    const uploads = await new Promise((resolve, reject) => picker({ accept: ['image/*'], multiple: true }, files => resolve(files)))
    if (!uploads || !uploads.length) return
    const files = [].slice.call(uploads)

    const uris = await Promise.all(files.map(async file => {
      return new Promise((resolve, reject) => {
        const reader = new window.FileReader()
        reader.onerror = function (err) { reject(err) }
        reader.onload = function () { resolve(reader.result) }
        reader.readAsDataURL(file)
      })
    }))

    const images = this.state.images || []
    this.setState({
      images: images.concat(files.map((file, i) => { return { file: file, uri: uris[i] } }))
    })
  }

  deleteImage (i) {
    const images = this.state.images || []
    images.splice(i, 1)
    this.setState({ images })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const uploading = this.state.uploading
    const images = this.state.images

    return (
      <div className='mw7 m-auto mt5 layout vertical'>
        <div className={cls(!uploading && 'dn')}>
          <div className='fixed absolute--fill layout horizontal center justify-center f4 fw6 z-max' style={{ color: '#00a699', backgroundColor: 'rgba(255, 255, 255, .85)' }}>
            <div className='layout horizontal center relative'>
              <div className='absolute'>
                <div className='loader' />
              </div>
              <div className='ml5'>UPLOADING...</div>
            </div>
          </div>
        </div>
        <div className='layout vertical'>
          <h1 className='mw6 m-auto'>Zeige wie dein Unterrichtsort aussieht!</h1>
          <div className='mt4 layout horizontal b--dotted b--light-gray ba1 ph4 pv6 pointer' style={{ backgroundImage: 'url(/static/rect.svg)' }} onClick={() => this.openUpload()}>
            <button className='btn layout horizontal center m-auto'>
              <i className='material-icons mr3'>cloud_upload</i>
              <span>Foto hochladen</span>
            </button>
          </div>
          <div className='mt4'>
            {images.map((img, i) => (
              <div className='relative' key={i}>
                <img src={img.uri} alt={i} className='w-100' />
                <i className='material-icons absolute top-2 right-2 pointer' onClick={() => this.deleteImage(i)}>delete</i>
              </div>
          ))}
          </div>
          <div className='layout horizontal bt b--light-gray center mv4 pt4 mw6 w-100 m-auto'>
            <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
            <div className='ml-auto'>
              { images.length ? <button className='btn' onClick={() => this.nextPage()}>Weiter</button> : <button className='btn-gray' onClick={() => this.nextPage()}>Überspringen</button> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class CourseDescription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const description = get(course, 'description')
    const errors = {}

    if (!description) errors.description = 'Bitte geben Sie eine Beschreibung ein'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const { errors } = this.state || {}
    const step = Number(get(this.props, 'step'))
    const description = get(this.props, 'course.description') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Fang an, deine Beschreibung zu erstellen</h1>
        <label className='relative'>
          <textarea rows="4" className={cls('w-100 input', errors.description && 'b--red')} maxLength='500' value={description} onInput={(e) => this.update('description', e)} placeholder='Du wirst den Unterricht bei mir lieben, weil ...' />
          <div className='absolute top-0 right-0 pa2 f7 silver'>{500 - description.length}</div>
          <span className={cls('f7 red mt1 ml-auto')}>{errors.description}</span>
        </label>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class CourseTitle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const title = get(course, 'title')
    const errors = {}

    if (!title) errors.title = 'Geben Sie bitte einen Titel ein'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const { errors } = this.state
    const step = Number(get(this.props, 'step'))
    const title = get(this.props, 'course.title') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Gib deinem Lehrangebot einen Titel</h1>
        <input className={cls('w-100 input', errors.title && 'b--red')} type='text' value={title} onInput={(e) => this.update('title', e)} placeholder='Titel dieses Kurses' />
        <span className={cls('f7 red mt1 ml-auto')}>{errors.title}</span>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class Section3 extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex pr3'>
          <h1 className=''>Biete Deine Kurse bei bookandoffer an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
            <Link href={`/create-course?step=1`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Titel</span>
            <Link href={`/create-course?step=4`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalender, Preis</span>
            <Link href={`/create-course?step=${step + 1}`}>
              <button className='btn-green mt3'>Fortfahren</button>
            </Link>
          </div>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

class CourseDuration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const duration = get(course, 'duration')
    const errors = {}

    if (!duration || !isNumber(duration)) errors.duration = 'Bitte geben Sie die Länge der Sitzungen ein'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const duration = get(this.props, 'course.duration') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Wie lange dauert eine Sitzung deines Kurses?</h1>
        <label htmlFor='duration'>
          <div className='f7 fw4 mb1 ml1 layout horizontal'>
            <span className={cls(this.state.errors.duration && 'red')}>Minuten pro Sitzung</span>
            <span className={cls('ml-auto red', !this.state.errors.duration && 'dn')}>{this.state.errors.duration}</span>
          </div>
          <input type='text' name='duration' value={duration} className={cls('w-100 input', this.state.errors.duration && 'b--red')} onInput={(e) => this.update('duration', e)} placeholder='90' />
        </label>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class CoursePrice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const price = get(course, 'price')
    const errors = {}

    if (!price || !isNumber(price)) errors.price = 'Bitte geben Sie einen Preis pro Stunde ein'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const price = get(this.props, 'course.price') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Preis pro Kursstunde</h1>
        <div>
          <div className='f7 fw4 mb1 ml1 mt4 layout horizontal'>
            <span className={cls(this.state.errors.price && 'red')}>Preis</span>
            <span className={cls('ml-auto red', !this.state.errors.price && 'dn')}>{this.state.errors.price}</span>
          </div>
          <label className={cls('layout horizontal center label', this.state.errors.price && 'b--red')}>
            <input type='text' className={cls('w-100 bn outline-0 flex', this.state.errors.price && 'b--red')} value={price} onInput={(e) => this.update('price', e)} placeholder='410' />
            <span className='f4 fw4 ml1'>CHF</span>
            <span className='silver f6 ml2 fw2'>pro Stunde</span>
          </label>
        </div>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class CourseSize extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const groupSize = get(course, 'groupSize')
    const errors = {}

    if (!groupSize || !isNumber(groupSize)) errors.groupSize = 'Bitte geben Sie eine Gruppengröße an'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const groupSize = get(this.props, 'course.groupSize') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Lege die maximale Gruppengröße fest</h1>
        <label htmlFor='groupSize'>
          <div className='f7 fw4 mb1 ml1 layout horizontal'>
            <span className={cls(this.state.errors.groupSize && 'red')}>Maximale Teilnehmerzahl</span>
            <span className={cls('ml-auto red', !this.state.errors.groupSize && 'dn')}>{this.state.errors.groupSize}</span>
          </div>
          <input type='text' name='groupSize' value={groupSize} className={cls('w-100 input', this.state.errors.groupSize && 'b--red')} onInput={(e) => this.update('groupSize', e)} />
        </label>
        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class CourseSchedule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  nextPage () {
    const course = store.get('course')
    const startDate = get(course, 'startDate')
    const endDate = get(course, 'endDate')
    const startTime = get(course, 'startTime')
    const errors = {}

    if (!startDate) errors.startDate = 'Bitte geben Sie ein gültiges Startdatum ein'
    if (!endDate) errors.endDate = 'Geben Sie ein gültiges Enddatum ein'
    if (!startTime || !/^\d{1,2}:\d{1,2}\s*(am|pm)?$/i.test(startTime)) errors.startTime = 'Gültige Startzeit erforderlich'
    if (Object.keys(errors).length) return this.setState({ errors })

    const step = Number(get(this.props, 'step'))
    Router.push(`/create-course?step=${step + 1}`)
  }

  update (name, e) {
    const errors = get(this.state, 'errors') || {}
    delete errors[name]
    this.setState({ errors })
    update('course', { [name]: e.target.value })
  }

  componentWillMount () {
    update('course', { interval: 'DAILY' })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const interval = get(this.props, 'course.interval') || 'DAILY'
    const startDate = get(this.props, 'course.startDate') || moment()
    const endDate = get(this.props, 'course.endDate') || moment().add(5, 'days')
    const startTime = get(this.props, 'course.startTime') || ''

    const intervals = {
      DAILY: 'Daily',
      WEEKLY: 'Weekly',
      BIWEEKLY: 'Biweekly',
      MONTHLY: 'Monthly',
      QUARTERLY: 'Quarterly'
    }

    return (
      <div className='course-schedule mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>In welchem Zeitraum findet dein Kurs statt?</h1>
        <div className='layout vertical'>
          <div className='layout horizontal'>
            <label htmlFor='startDate' className='db flex-1 pa3'>
              <span className={cls(this.state.errors.startDate && 'red')}>Startdatum</span>
              <DatePicker selected={moment(startDate)} onChange={(date) => update('course', { startDate: date.format('l') })} className={cls('w-100 input', this.state.errors.startDate && 'b--red')} placeholderText='10/1/2017' />
              <span className={cls('ml-auto red', !this.state.errors.startDate && 'dn')}>{this.state.errors.startDate}</span>
            </label>
            <label htmlFor='endDate' className='db flex-1 pa3'>
              <div className='f7 fw4 mb1 ml1 layout horizontal'>
                <span className={cls(this.state.errors.endDate && 'red')}>Enddatum</span>
                <span className={cls('ml-auto red', !this.state.errors.endDate && 'dn')}>{this.state.errors.endDate}</span>
              </div>
              <DatePicker selected={moment(endDate)} onChange={(date) => update('course', { endDate: date.format('l') })} className={cls('w-100 input', this.state.errors.endDate && 'b--red')} placeholderText='10/6/2017' />
            </label>
          </div>
          <div className='layout horizontal'>
            <label htmlFor='interval' className='db flex-1 pa3'>
              <div className='f7 fw4 mb1 ml1 mt4'>Intervall</div>
              <select value={interval} className='select w-100' onChange={(e) => update('course', { interval: e.target.value })}>
                {Object.keys(intervals).map(i => (
                  <option key={i} value={i}>{intervals[i]}</option>
                ))}
              </select>
            </label>
            <label htmlFor='startTime' className='db flex-1 pa3'>
              <div className='f7 fw4 mb1 ml1 mt4 layout horizontal'>
                <span className={cls(this.state.errors.startTime && 'red')}>Uhrzeit</span>
                <span className={cls('ml-auto red', !this.state.errors.startTime && 'dn')}>{this.state.errors.startTime}</span>
              </div>
              <input type='text' className={cls('w-100 input', this.state.errors.startTime && 'b--red')} value={startTime} onInput={(e) => update('course', { startTime: e.target.value })} placeholder='15:00' />
            </label>
          </div>
        </div>

        <div className='layout horizontal bt b--light-gray center mt6 pt4'>
          <Link href={`/create-course?step=${step - 1}`}><span className='c-484848'>← Zurück</span></Link>
          <div className='ml-auto'>
            <button className='btn' onClick={() => this.nextPage()}>Weiter</button>
          </div>
        </div>
      </div>
    )
  }
}

class Section4 extends Component {
  async save () {
    const [ err, course ] = await upsertCourse(this.props.user, store.get('course'))
    if (err) {
      return StatusBar.setState({
        error: 'Der Kurs konnte nicht erstellt werden. Bitte wenden Sie sich an info@bookandoffer.com'
      })
    } else {
      console.log('created course', course)
      store.remove('course')
      Router.push('/me')
    }
  }

  render () {
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex pr3'>
          <h1 className=''>Biete Deine Kurse bei bookandoffer an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
            <Link href={`/create-course?step=1`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Title</span>
            <Link href={`/create-course?step=4`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalendar, Preis</span>
            <Link href={`/create-course?step=8`}><div className='f7 pt2 c-45A399'>bearbeiten</div></Link>
          </div>
          <button onClick={() => this.save()} className='btn mt5 self-start'>Speichern und Kurs erstellen</button>
        </div>
        <div className='flex contain pa4 bg-center' style={{backgroundImage: 'url(/static/translation.svg)'}} />
      </div>
    )
  }
}

function update (key, value) {
  const existing = store.get(key)
  store.set(key, Object.assign({}, existing, value))
}

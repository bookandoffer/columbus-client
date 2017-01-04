import countries from '../lib/countries/index.json'
import loadCourse from '../lib/load-course'
import Header from '../components/header'
import defaults from 'lodash.defaults'
import redirect from '../lib/redirect'
import Head from '../components/head'
import { Component } from 'react'
import graph from '../lib/graph'
import assign from 'deep-assign'
import Link from 'next/link'
import store from '../lib/store'
import Router from 'next/router'
import auth from '../lib/auth'
import get from 'dlv'

const alert = typeof window === 'undefined'
? console.error
: window.alert

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
          <h1 className='h-1'>Biete Deine Kurse bei Columbus an!</h1>
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
  componentWillMount () {
    update('course', { type: 'LANGUAGE' })
  }

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
        <h1 className='h-1 sysFont'>Biete Deine Kurse bei Columbus an!</h1>
        <select value={type} className='mt5 select' onChange={(e) => update('course', { type: e.target.value })}>
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
  componentWillMount () {
    update('course', { country: 'DE' })
  }

  render () {
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
          <div className='f7 fw4 mb1 ml1'>Straße und Hausnummer</div>
          <input type='text' name='address' value={location.address} className='w-100 input' onInput={(e) => update('course', { address: e.target.value })} />
        </label>

        <label htmlFor='addressSecondary' className='mt4' >
          <div className='f7 fw4 mb1 ml1'>Zugangscode, Wohnung, Stockwerk, usw. (optional)</div>
          <input type='text' name='addressSecondary' value={location.addressSecondary} className='w-100 input' onInput={(e) => update('course', { addressSecondary: e.target.value })} />
        </label>

        <div className='layout horizontal'>
          <label htmlFor='city' className='mr2 mt4 w-100' >
            <div className='f7 fw4 mb1 ml1'>Stadt</div>
            <input type='text' name='city' value={location.city} className='w-100 input' onInput={(e) => update('course', { city: e.target.value })} />
          </label>
          <label htmlFor='postal' className='ml2 mt4 w-100' >
            <div className='f7 fw4 mb1 ml1'>Postleitzahl</div>
            <input type='text' name='postal' value={location.postal} className='w-100 input' onInput={(e) => update('course', { postal: e.target.value })} />
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
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
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
    const url = window.prompt('Bitte geben Sie eine URL zu einem Bild ein')
    if (!url) return

    const images = (get(store.get('course'), 'images') || []).concat(url)
    update('course', { images: images })
  }

  deleteImage (src) {
    let images = get(this.props, 'course.images') || []
    const i = images.indexOf(src)
    if (~i) images.splice(i, 1)
    update('course', { images: images })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const images = get(this.props, 'course.images') || []

    return (
      <div className='mw7 m-auto mt5 layout vertical'>
        <h1 className='mw6 m-auto'>Zeige deihen Gasten wie dein Unterrichtsort aussieht!</h1>
        <div className='mt4 layout horizontal b--dotted b--light-gray ba1 ph4 pv6 pointer' style={{ backgroundImage: 'url(/static/rect.svg)' }} onClick={() => this.openUpload()}>
          <button className='btn layout horizontal center m-auto'>
            <i className='material-icons mr3'>cloud_upload</i>
            <span>Fotos hochladen</span>
          </button>
        </div>
        <div className='mt4'>
          {images.map(src => (
            <div className='relative'>
              <img src={src} alt={src} key={src} className='w-100' />
              <i className='material-icons absolute top-2 right-2 pointer' onClick={() => this.deleteImage(src)}>delete</i>
            </div>
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
        <h1 className='h-1'>Fang an, deine Beschreibung zu erstellen</h1>
        <label className='relative'>
          <input type='text' className='w-100 input' maxLength='50' value={description} onInput={(e) => update('course', { description: e.target.value })} placeholder='Du wirst den Unterricht bei mir lieben, weil' />
          <div className='absolute top-0 right-0 pa2 f7 silver'>{50 - description.length}</div>
        </label>
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
        <h1 className='h-1'>Gib deinem Lehrangebot einen Titel</h1>
        <input className='w-100 input' type='text' value={title} onInput={(e) => update('course', { title: e.target.value })} placeholder='Titel dieses Kurses' />
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

class Section3 extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex pr3'>
          <h1 className=''>Biete Deine Kurse bei Columbus an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Title</span>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalendar, Preis</span>
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
  render () {
    const step = Number(get(this.props, 'step'))
    const duration = get(this.props, 'course.duration') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Wie lange dauert eine Sitzung deines Kurses?</h1>
        <label htmlFor='duration'>
          <div className='f7 fw4 mb1 ml1'>Stunden</div>
          <input className='w-100 input' type='text' value={duration} onInput={(e) => update('course', { duration: e.target.value })} placeholder='1' />
        </label>
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

class CoursePrice extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const price = get(this.props, 'course.price') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Lege Preie für deinen Kurs fest</h1>
        <div>
          <div className='f7 fw4 mb1 ml1 mt4'>Preis</div>
          <label className='layout horizontal center label'>
            <input type='text' className='w-100 bn outline-0 flex' value={price} onInput={(e) => update('course', { price: e.target.value })} placeholder='410' />
            <span className='f4 fw4 ml1'>€</span>
            <span className='silver f6 ml2 fw2'>für den gesamten Kurs</span>
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

class CourseSize extends Component {
  render () {
    const step = Number(get(this.props, 'step'))
    const groupSize = get(this.props, 'course.groupSize') || ''

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>Lege die maximale Gruppengröße fest</h1>
        <label htmlFor='duration'>
          <div className='f7 fw4 mb1 ml1 mt4'>Maximale Teilnehmerzahl</div>
          <input type='text' className='w-100 input' value={groupSize} onInput={(e) => update('course', { groupSize: e.target.value })} placeholder='10' />
        </label>
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

class CourseSchedule extends Component {
  componentWillMount () {
    update('course', { interval: 'DAILY' })
  }

  render () {
    const step = Number(get(this.props, 'step'))
    const interval = get(this.props, 'course.interval') || 'DAILY'
    const startDate = get(this.props, 'course.startDate') || ''
    const endDate = get(this.props, 'course.endDate') || ''
    const startTime = get(this.props, 'course.startTime') || ''

    const intervals = {
      DAILY: 'Daily',
      WEEKLY: 'Weekly',
      BIWEEKLY: 'Biweekly',
      MONTHLY: 'Monthly',
      QUARTERLY: 'Quarterly'
    }

    return (
      <div className='mw6 m-auto mt5 layout vertical'>
        <h1 className='h-1'>In welchem Zeitraum findet dein Kurs statt?</h1>
        <div className='layout vertical'>
          <div className='layout horizontal'>
            <label htmlFor='startDate' className='db flex-1 pa3'>
              <div className='f7 fw4 mb1 ml1 mt4'>Startdatum</div>
              <input type='text' className='w-100 input' value={startDate} onInput={(e) => update('course', { startDate: e.target.value })} placeholder='10.01.2017' />
            </label>
            <label htmlFor='endDate' className='db flex-1 pa3'>
              <div className='f7 fw4 mb1 ml1 mt4'>Enddatum</div>
              <input type='text' className='w-100 input' value={endDate} onInput={(e) => update('course', { endDate: e.target.value })} placeholder='10.03.2017' />
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
              <div className='f7 fw4 mb1 ml1 mt4'>Uhrzeit</div>
              <input type='text' className='w-100 input' value={startTime} onInput={(e) => update('course', { startTime: e.target.value })} placeholder='15:00' />
            </label>
          </div>
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

class Section4 extends Component {
  async save () {
    const course = store.get('course')
    const user = this.props.user
    let res

    if (!course.id) {
      res = await graph(`
        mutation createCourse (
          $address: String!,
          $addressSecondary: String,
          $city: String!,
          $country: String!,
          $description: String!,
          $duration: Int!,
          $endDate: DateTime!,
          $groupSize: Int!,
          $images: [String!],
          $interval: COURSE_INTERVAL!,
          $postal: String!,
          $price: Int!,
          $startDate: DateTime!,
          $startTime: String!,
          $title: String!,
          $type: COURSE_TYPE!,
          $fullAddress: String!,
          $userId: ID!
        ) {
          createCourse(
            address: $address,
            addressSecondary: $addressSecondary,
            city: $city,
            country: $country,
            description: $description,
            duration: $duration,
            endDate: $endDate,
            groupSize: $groupSize,
            images: $images,
            interval: $interval,
            postal: $postal,
            price: $price,
            startDate: $startDate,
            startTime: $startTime,
            title: $title,
            type: $type,
            fullAddress: $fullAddress,
            userId: $userId
          ) {
            id
          }
        }
      `, {
        address: course.address,
        addressSecondary: course.addressSecondary,
        city: course.city,
        country: course.country,
        description: course.description,
        duration: Number(course.duration),
        endDate: new Date(course.endDate).toISOString(),
        groupSize: Number(course.groupSize),
        images: course.images,
        interval: course.interval,
        postal: course.postal,
        price: Number(course.price),
        startDate: new Date(course.startDate).toISOString(),
        startTime: course.startTime,
        title: course.title,
        type: course.type,
        fullAddress: fullAddress(course),
        userId: user.id
      })
    } else {
      res = await graph(`
        mutation updateCourse (
          $id: ID!,
          $address: String!,
          $addressSecondary: String,
          $city: String!,
          $country: String!,
          $description: String!,
          $duration: Int!,
          $endDate: DateTime!,
          $groupSize: Int!,
          $images: [String!],
          $interval: COURSE_INTERVAL!,
          $postal: String!,
          $price: Int!,
          $startDate: DateTime!,
          $startTime: String!,
          $title: String!,
          $type: COURSE_TYPE!,
          $fullAddress: String!,
          $userId: ID!
        ) {
          updateCourse (
            id: $id,
            address: $address,
            addressSecondary: $addressSecondary,
            city: $city,
            country: $country,
            description: $description,
            duration: $duration,
            endDate: $endDate,
            groupSize: $groupSize,
            images: $images,
            interval: $interval,
            postal: $postal,
            price: $price,
            startDate: $startDate,
            startTime: $startTime,
            title: $title,
            type: $type,
            fullAddress: $fullAddress,
            userId: $userId
          ) {
            id
          }
        }
      `, {
        id: course.id,
        address: course.address,
        addressSecondary: course.addressSecondary,
        city: course.city,
        country: course.country,
        description: course.description,
        duration: Number(course.duration),
        endDate: new Date(course.endDate).toISOString(),
        groupSize: Number(course.groupSize),
        images: course.images,
        interval: course.interval,
        postal: course.postal,
        price: Number(course.price),
        startDate: new Date(course.startDate).toISOString(),
        startTime: course.startTime,
        title: course.title,
        type: course.type,
        fullAddress: fullAddress(course),
        userId: user.id
      })
    }

    if (res instanceof Error) {
      alert(res.message)
      return
    } else {
      // clear out localstorage
      store.remove('course')
    }

    Router.push('/me')
  }

  render () {
    return (
      <div className='layout horizontal mw8 m-auto pa4'>
        <div className='layout vertical flex pr3'>
          <h1 className=''>Biete Deine Kurse bei Columbus an!</h1>
          <div className='layout vertical mt3'>
            <span className='f7'>SCHRITT 1</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beginne mit den Basics</span>
            <span className='f7 mt2'>Ort, Art des Kurses</span>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 2</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Beschreib die Atmosphäre</span>
            <span className='f7'>Fotos, Kurzbeschreibung, Title</span>
          </div>
          <div className='layout vertical mt4'>
            <span className='f7 mt2'>SCHRITT 3</span>
            <i className='material-icons self-end f2 c-45A399' style={{height: 0}}>check_circle</i>
            <span className='f4 mt2'>Mach dich bereit für deine Schüler</span>
            <span className='f7'>Lektionen, Kalendar, Preis</span>
          </div>
          <button onClick={() => this.save()} className='btn mt5 self-start'>Speichern und Account erstellen</button>
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

function fullAddress (course) {
  return `${course.address} ${course.addressSecondary || ''} ${course.city}, ${course.country} ${course.postal}`
}

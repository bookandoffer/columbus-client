import loadCourse from '../lib/load-course'
import Header from '../components/header'
import redirect from '../lib/redirect'
import Head from '../components/head'
import Mailgun from '../lib/mailgun'
import { Component } from 'react'
import Router from 'next/router'
import auth from '../lib/auth'
import get from 'dlv'
import Portal from 'react-portal'

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

const alert = typeof window === 'undefined'
  ? console.error
  : window.alert

export default class Me extends Component {

  static async getInitialProps (ctx) {
    const courseId = get(ctx, 'query.id')

    // go back if we don't have a course id via ?course=...
    if (!courseId) return redirect(ctx, '/')

    const res = await loadCourse(courseId)
    if (res instanceof Error) {
      alert(res.message)
      return redirect(ctx, '/')
    } else if (!res.course) {
      alert('could not find the course you specified')
      return redirect(ctx, '/')
    }

    return { course: res.course }
  }

  render () {
    const data = Object.assign({}, staticData, this.props.course)

    var evenEquipment = []
    for (var i = 0; i < data['equipment'].length; i += 2) {
      evenEquipment.push(<span key={i}>{data['equipment'][i]}</span>)
    }
    var oddEquipment = []
    for (var i = 1; i < data['equipment'].length; i += 2) {
      oddEquipment.push(<span key={i}>{data['equipment'][i]}</span>)
    }

    return (
      <div>
        <Head title='Columbus | Course Details' />

        <pre style={{display: 'none'}}><code>{JSON.stringify(this.props.course, true, 2)}</code></pre>

        <Header />

        <div className='w-100' style={{height: '500px', backgroundImage: 'url(' + data.images[0] + ')', backgroundSize: 'cover'}} />

        <div className='w-100 flex justify-start sysFont pb4' style={{paddingLeft: '15%', marginLeft: '5px', borderLeft: '2px solid #F1F1F1', borderBottom: '2px solid #F1F1F1'}}>
          <div className='w-70' style={{minWidth: '800px'}}>
            <div className='flex h-100'>
              <div className='w5 layout vertical'>
                <div className='pa3' style={{height: '200px'}}>
                  <div className='flex h-100' style={{backgroundImage: "url('/static/course-logo.png')", backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}} />
                </div>
                <div className='flex justify-center courseTextSecondary items-start'>
                  Taleninstituut
                </div>
              </div>
              <div className='flex layout vertical pl3'>
                <div className='flex layout vertical'>
                  <span className='flex items-end f3 courseTextPrimary'>{data['title']}</span>
                  <span className='flex items-start f7 courseTextSecondary pt1'>{data['address']}</span>
                </div>
                <div className='flex'>
                  <div className='flex items-center layout vertical'>
                    <div className='flex h-100 w-100' style={{backgroundImage: "url('/static/icons/house-icon.png')", backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}} />
                    <div className='flex courseTextSecondary'>Sprachschule</div>
                  </div>
                  <div className='flex items-center layout vertical'>
                    <div className='flex h-100 w-100' style={{backgroundImage: "url('/static/icons/people-icon.png')", backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}} />
                    <div className='flex courseTextSecondary'>Gruppenunterricht</div>
                  </div>
                  <div className='flex items-center layout vertical'>
                    <div className='flex h-100 w-100' style={{backgroundImage: "url('/static/icons/door-icon.png')", backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}} />
                    <div className='flex courseTextSecondary'>{data['duration']} Lektionen/Woche</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-100 flex justify-start sysFont pb4' style={{paddingLeft: '15%'}}>
          <div className='w-70 pt5' style={{minWidth: '800px', borderBottom: '2px solid #F1F1F1'}}>
            <p className='f4 fw7 courseTextPrimary'>Über dieses Inserat</p>
            <p className='f5 pb4 courseTextSecondary'>{data['description']}</p>
            <p className='f5 fw7 pb2 courseTextSecondary pointer' style={{color: '#56B6C5'}}>Kontaktiere den Anbieter</p>
          </div>
        </div>

        <div className='w-100 flex justify-start sysFont' style={{paddingLeft: '15%'}}>
          <div className='w-70 layout horizontal pb5' style={{minWidth: '800px', borderBottom: '2px solid #F1F1F1'}}>
            <div className='w5 courseTextSecondary fw7' style={{fontSize: '1.1rem'}}>Der Unterricht</div>
            <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
              <span>Gruppenunterricht</span>
              <span>Max Teilnehmer: {data['groupSize']}</span>
            </div>
            <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
              <span>Stunden / Woche: {data['duration']}</span>
            </div>
          </div>
        </div>

        <div className='w-100 flex justify-start sysFont pt4' style={{paddingLeft: '15%'}}>
          <div className='w-70 layout horizontal pb5' style={{minWidth: '800px', borderBottom: '2px solid #F1F1F1'}}>
            <div className='w5 courseTextSecondary fw7' style={{fontSize: '1.1rem'}}>Ausstattung</div>
            <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
              {evenEquipment}
            </div>
            <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
              {oddEquipment}
            </div>
          </div>
        </div>

        <div className='w-100 flex justify-start sysFont pt4' style={{paddingLeft: '15%'}}>
          <div className='w-70 layout horizontal pb5' style={{minWidth: '800px', borderBottom: '2px solid #F1F1F1'}}>
            <div className='w5 courseTextSecondary fw7' style={{fontSize: '1.1rem'}}>Sprache</div>
            <div className='flex layout vertical courseTextSecondary f6' style={{lineHeight: '2'}}>
              {data['language']}
            </div>
          </div>
        </div>

        <div className='w-100 flex justify-start sysFont pt4' style={{paddingLeft: '15%'}}>
          <div className='w-70 layout horizontal pb6' style={{minWidth: '800px', borderBottom: '2px solid #F1F1F1'}}>
            <div className='w5 courseTextSecondary fw7' style={{fontSize: '1.1rem'}}>Sprachniveau</div>
            <div className='flex layout courseTextSecondary vertical h3 f6' style={{lineHeight: '2'}}>
              <form className='flex items-start flex-wrap'>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='a1' /> A1</label>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='b1' /> B1</label>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='c1' /> C1</label>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='a2' /> A2</label>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='b2' /> B2</label>
                <label className='' style={{width: '33%'}}><input type='radio' name='level' value='c2' /> C2</label>
              </form>
            </div>
          </div>
        </div>

      </div>

    )
  }
}

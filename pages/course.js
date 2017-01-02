import loadCourse from '../lib/load-course'
import Header from '../components/header'
import redirect from '../lib/redirect'
import Head from '../components/head'
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
  'equipment': ['Wi-Fi','Beamer','Laptop (Windows)','Wasser','Kaffee','Obst'],
  'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos cumque dolore, quidem, nobis doloremque placeat, laudantium ex, totam veritatis suscipit incidunt? Iure assumenda fuga quo facere modi fugiat similique, ex!',
  'language':'Niederländisch',
  'image': 'http://dropbox.com/asdjflkajsdf.png',
  'price': 35
}

var egdata = {
  "postal": "53122",
  "duration": 10,
  "city": "Wisconsin",
  "startTime": "15:30",
  "endDate": "2017-01-18T06:00:00.000Z",
  "description": "This is an english course",
  "price": 500,
  "groupSize": 15,
  "country": "DE",
  "interval": "DAILY",
  "id": "cixfcq4jyv7ml0119j1itlz9d",
  "addressSecondary": null,
  "address": "1145 Lone Tree Rd",
  "title": "English course in Elm Grove",
  "type": "LANGUAGE",
  "equipment": ['Wi-Fi','Beamer','Laptop (Windows)','Wasser','Kaffee','Obst'],
  "startDate": "2017-01-12T06:00:00.000Z",
  "images": [
    "http://www.elmgrovewi.org/images/pages/N1/slide1.jpg"
  ]
}

const alert = typeof window === 'undefined'
  ? console.error
  : window.alert

export default class Me extends Component {

  // static async getInitialProps (ctx) {
  //   const courseId = get(ctx, 'query.id')

  //   // go back if we don't have a course id via ?course=...
  //   if (!courseId) return redirect(ctx, '/')

  //   const res = await loadCourse(courseId)
  //   if (res instanceof Error) {
  //     alert(res.message)
  //     return redirect(ctx, '/')
  //   } else if (!res.course) {
  //     alert('could not find the course you specified')
  //     return redirect(ctx, '/')
  //   }

  //   return { course: res.course }
  // }


  render () {
    var evenEquipment = [];
    for (var i = 0; i < egdata['equipment'].length; i+=2) {
      evenEquipment.push(<span key={i}>{egdata['equipment'][i]}</span>);
    }
    var oddEquipment = [];
    for (var i = 1; i < egdata['equipment'].length; i+=2) {
      oddEquipment.push(<span key={i}>{egdata['equipment'][i]}</span>);
    }
    return (
      <div>
        <Head title='Columbus | Course Details' />

        <pre style = {{display:"none"}}><code>{JSON.stringify(this.props.course, true, 2)}</code></pre>

        <Header />

        <div className = "w-100" style = {{height:"500px",backgroundImage:"url(" + egdata['images'][0] + ")",backgroundSize:"cover"}}></div>

        <div className = "w-100 flex justify-start sysFont pb4" style = {{paddingLeft:"15%",marginLeft:"5px", borderLeft:"2px solid #F1F1F1",borderBottom:"2px solid #F1F1F1"}}>
          <div className = "w-70" style = {{minWidth:"800px"}}>
            <div className = "flex h-100">
              <div className = "w5 layout vertical">
                <div className = "pa3" style = {{height:"200px"}}>
                  <div className = "flex h-100" style = {{backgroundImage:"url('/static/course-logo.png')",backgroundSize:"contain", backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}></div>
                </div>
                <div className = "flex justify-center items-start" style = {{color:"#555555"}}>
                  Taleninstituut
                </div>
              </div>
              <div className = "flex layout vertical pl3" style = {{}}>
                <div className = "flex layout vertical">
                  <span className = "flex items-end f4 courseTextPrimary">Standardkurs, NL, A1</span>
                  <span className = "flex items-start f7 courseTextSecondary pt1">Amsterdam, NH, Niederlande</span>
                </div>
                <div className = "flex">
                  <div className = "flex items-center layout vertical">
                    <div className = "flex h-100 w-100" style = {{backgroundImage:"url('/static/icons/house-icon.png')",backgroundSize:"contain",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}></div>
                    <div className = "flex courseTextSecondary">Sprachschule</div>
                  </div>
                  <div className = "flex items-center layout vertical">
                    <div className = "flex h-100 w-100" style = {{backgroundImage:"url('/static/icons/people-icon.png')",backgroundSize:"contain",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}></div>
                    <div className = "flex courseTextSecondary">Gruppenunterricht</div>
                  </div>
                  <div className = "flex items-center layout vertical">
                    <div className = "flex h-100 w-100" style = {{backgroundImage:"url('/static/icons/door-icon.png')",backgroundSize:"contain",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}></div>
                    <div className = "flex courseTextSecondary">20 Lektionen/Woche</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className = "w-100 flex justify-start sysFont pb4" style = {{paddingLeft:"15%"}}>
          <div className = "w-70 pt5" style = {{minWidth:"800px",borderBottom:"2px solid #F1F1F1"}}>
            <p className = "f4 fw7 courseTextPrimary">Über dieses Inserat</p>
            <p className = "f5 pb4 courseTextSecondary">{egdata['description']}</p>
            <p className = "f5 fw7 pb2 courseTextSecondary" style = {{color:"#56B6C5"}}>Kontaktiere den Anbieter</p>
          </div>
        </div>

        <div className = "w-100 flex justify-start sysFont" style = {{paddingLeft:"15%"}}>
          <div className = "w-70 layout horizontal pb5" style = {{minWidth:"800px",borderBottom:"2px solid #F1F1F1",lineHeight:"2"}}>
            <div className = "w5 courseTextSecondary fw7" style = {{fontSize:"1.1rem"}}>Der Unterricht</div>
            <div className = "flex layout vertical courseTextSecondary f6" style = {{lineHeight:"2"}}>
              <span>Gruppenunterricht</span>
              <span>Max Teilnehmer: {egdata['groupSize']}</span>
            </div>
            <div className = "flex layout vertical courseTextSecondary f6" style = {{lineHeight:"2"}}>
              <span>Stunden / Woche: {egdata['duration']}</span>
            </div>
          </div>
        </div>

        <div className = "w-100 flex justify-start sysFont pv4" style = {{paddingLeft:"15%"}}>
          <div className = "w-70 layout horizontal pb5" style = {{minWidth:"800px",borderBottom:"2px solid #F1F1F1",lineHeight:"2"}}>
            <div className = "w5 courseTextSecondary fw7" style = {{fontSize:"1.1rem"}}>Ausstattung</div>
            <div className = "flex layout vertical courseTextSecondary f6" style = {{lineHeight:"2"}}>
              {evenEquipment}
            </div>
            <div className = "flex layout vertical courseTextSecondary f6" style = {{lineHeight:"2"}}>
              {oddEquipment}
            </div>
          </div>
        </div>

    
      </div>



    )
  }
}

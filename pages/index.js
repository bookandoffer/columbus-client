import { Component } from 'react'
import Header from '../components/header'
import Head from 'next/head'
import Portal from 'react-portal'

var data = {
  'name': 'Standardkur, NL, A1',
  'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos cumque dolore, quidem, nobis doloremque placeat, laudantium ex, totam veritatis suscipit incidunt? Iure assumenda fuga quo facere modi fugiat similique, ex!',
  'image': 'http://dropbox.com/asdjflkajsdf.png',
  'price': 35

}

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  componentDidMount () {
    console.log('mounted!')
  }

  render () {
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='/static/tachyons.css' rel='stylesheet' />
          <link href='/static/flex.css' rel='stylesheet' />
          <link href='/static/global.css' rel='stylesheet' />
          <link href='/static/theme.css' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons'
            rel='stylesheet' />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
        </Head>
        <div className='w-100 center'>
          <Header />

          <div className = "db background-banner layout horizontal center sysFont" style = {{"backgroundImage":"url(/static/Header-bg.png)"}}>
            <div className="center" style = {{"textAlign":"center", "width":"80%","marginTop":"-50px", "maxWidth":"1200px"}}>
              <h1 className = "white mt0 normal headerSize mb1">Entdecke die Welt!</h1>
              <h2 className = "white mt0 normal f3 pv0 mb4">Finde den Kurs, der zu Dir passt!</h2>
              <h3 className = "white mt0 normal f6 pv0 orange-yellow mb4" style = {{"letterSpacing":"2px"}}>FINDE JETZT SPRACHKURSE, SPORTKURSE UND MEHR</h3>

              <div className = "bg-white mt0 center layout horizontal searchBox" style = {{"width":"100%", "height":"80px","maxWidth":"1000px"}}>
                <div className = "flex layout vertical justify-center f6 pa3" style = {{"borderRight":"1px solid #eeeeee","textAlign":"left"}}><span className = "c-484848 pb2">Welche Art Kurs suchst du?</span><span className = "textSecondary">Sprachkurs, Tanzkurs, ...</span></div>
                <div className = "flex layout vertical justify-center f6 pa3" style = {{"borderRight":"1px solid #eeeeee","textAlign":"left"}}><span className = "c-484848 pb2">Wo</span><span className = "textSecondary">Stadt, Land, Region</span></div>
                <div className = "flex layout vertical justify-center f6 pa3" style = {{"textAlign":"left"}}><span className = "c-484848 pb2">Wann</span><span className = "textSecondary">Datum oder Zeitraum</span></div>
                <div className = "flex layout vertical justify-center pr3"><button className = "btn bn" style = {{"height":"40px","borderRadius":"5px","width":"150px"}}>Suche</button></div>
              </div>

            </div>
            <div style={{"paddingBottom":"38.2%"}} />
          </div>


          {/*

          <div className = "sysFont h5 w-80 center mt5 mb5" style = {{"border":"1px solid blue","textAlign":"center","paddingBottom":"40%","maxWidth":"1000px"}}>

              <div className = "layout horizontal h-100">
                <div className = "flex justify-center bg-red self-stretch">hi</div>
                <div className = "flex justify-center bg-blue self-stretch">hello</div>
              </div>

 


          </div>

          {/* <img className="w-100 db" src="/static/berlin.jpg" /> /*}

        */}

        <div className='layout vertical tc mv5 ph7' style={{minHeight: '400px'}}>
            <div className='layout horizontal flex-1'>
              <div className='flex-2' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>paris</div>
              <div className='layout vertical flex-1'>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Rom</div>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Lisabon</div>
              </div>
              <div className='layout vertical flex-1'>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>LA</div>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Tokyo</div>
              </div>
            </div>
            <div className='layout horizontal flex-1'>
              <div className='layout vertical flex-1'>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>London</div>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Barcelona</div>
              </div>
              <div className='flex-2' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>New York</div>
              <div className='layout vertical flex-1'>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Amsterdam</div>
                <div className='flex-1' style={{ backgroundImage: "url('/static/Header-bg.png')",backgroundSize:"cover"}}>Berlin</div>
              </div>
            </div>
          </div>

        {/*

          some saved stuff

        <div className={cls('pa1', this.state.errors && 'error')}>{data.name}</div>
        <img width='112' className='pa5' src='https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png' alt='next.js' />
        <Link href="/course">Courses</Link>
        */}

        </div>
      </div>
    )
  }
}


import Head from 'next/head'
import Portal from 'react-portal'

var data = {
  "name": "Standardkur, NL, A1",
  "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos cumque dolore, quidem, nobis doloremque placeat, laudantium ex, totam veritatis suscipit incidunt? Iure assumenda fuga quo facere modi fugiat similique, ex!",
  "image": "http://dropbox.com/asdjflkajsdf.png",
  "price": 35,

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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" />
        </Head>
        <div className='w-100 center'>
          <Header />

          <div className = "w-100 db contain bg-center layout horizontal center" style = {{"backgroundImage":"url(/static/Header-bg.png)"}}>
            <div className="center">
              <h1 className = "white mt0">Entdecke die Welt!</h1>
              <h1 className = "white mt0">Entdecke die Welt!</h1>
            </div>
            <div style={{"paddingBottom":"38.2%"}} />
          </div>

          {/* <img className="w-100 db" src="/static/berlin.jpg" /> /*}



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

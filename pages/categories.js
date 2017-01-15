import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head'
import Link from 'next/link'
import { Component } from 'react'

export default class Categories extends Component {
  static async getInitialProps (ctx) {

  }

  render () {
    return (

      <div>
        <Head title='Columbus | Categories' />
        <Header />
        <div className='mw7 m-auto pa4'>
          <div className='pv3'>
            <h2 className='f3 dark-gray fw3 mb0'>Book and Offer bietet dir ganz unterschiedliche Kategorien an Kursen an</h2>
            <p className='f6'>Damit du bei Book and Offer immer den richtigen Kurs findest, haben wir diee Kurse in ganz unterschiedliche Kategorien unterteilt.</p>
          </div>

          <div className='mv3 layout horizontal wrap'>
            <div className='pa2 w-50'>
              <Link href='/courses?category=language'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/language.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Sprachkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Englisch, Spanisch, Italienisch</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=computer'>
                <div className='aspect-ratio aspect-ratio--16x9 pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/computer.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Computerkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Word, Excel, iPad</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=golf'>
                <div className='aspect-ratio aspect-ratio--16x9 pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/golf.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Golfkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Platzreife, Fortgeschritten</p>
                  </div>
                </div>
              </Link>

            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=golf'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/painting.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Malkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Zeichnen für Einsteiger, Ölmalerei, Acryl</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=painting'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/skiing.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Skikurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Profis</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=cooking'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/cooking.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Kochkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Fortgeschritten, Profis</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=yoga'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/yoga.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Yogakurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Hatha Yoga, Einsteiger, Abendkurse</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=chess'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/chess.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Schachkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Einsteiger, Fortgeschritten, Profis</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='pa2 w-50'>
              <Link href='/courses?category=riding'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/riding.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Reitkurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Kinderreitkurse, Einsteiger, Parcour</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className='pa2 w-50'>
              <Link href='/courses?category=fitness'>
                <div className='aspect-ratio aspect-ratio--16x9  pointer'>
                  <div className='aspect-ratio--object pa3 cover layout vertical justify-end z-0' style={{ backgroundImage: `url(/static/categories/fitness.png)` }}>
                    <h3 className='c-FFFFFF fw4 f3 mb0'>Fitnesskurse</h3>
                    <p className='c-FFFFFF f6 fw2 mv1'>Crossfit, Aerobic</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

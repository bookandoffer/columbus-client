import findCourses from '../lib/find-courses'
import Header from '../components/header'
import Footer from '../components/footer'
import redirect from '../lib/redirect'
import Head from '../components/head'
import { Component } from 'react'
import Router from 'next/router'
import auth from '../lib/auth'
import get from 'dlv'

const alert = typeof window === 'undefined'
  ? console.error
  : window.alert

export default class Thanks extends Component {

  render () {
    return (
      <div>
        <Head title='Thanks!' />
        <div className='layout vertical vh-100'>
          <Header {...this.props} />
          <div className='layout horizontal flex mw8 m-auto mv4 center pa3'>
            <div className='flex-1'>
              <h1 className='fw4'>Deine Buchungsanffage wurde übermittelt!</h1>
              <p>Der Gastgeber bzw. die Sprachschule wird sich innerhalb von 24 Studen bei dir melden und die Buchung bestätigen bzw. stornieren.</p>
              <h2 className='fw4 mt5 mb0'>Standardkurs, NL, A1</h2>
              <h3 className='silver f5 fw3 mt0 mb4'>Standardkurs, NL, A1</h3>
              <div>12 Wochen à 20 Stunden</div>
              <div>Startdatum: 01.02.2017</div>
              <div>Gesamtsumme: 460 €</div>
            </div>
            <img className='flex-1' src='/static/backpack.svg' alt='Backpack' />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

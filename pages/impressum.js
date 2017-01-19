import 'babel-polyfill'
import { Component } from 'react'
import Header from '../components/header'
import Head from '../components/head'
import Footer from '../components/footer'
import Router from 'next/router'
import Portal from 'react-portal'

export default () => (
  <div>
    <Head />
    <Header />
    <div className = "layout sysFont c-484848 vertical tc pv5" style = {{backgroundColor: "#F7F8FA", marginTop:"150px",marginBottom:"150px"}}>
    <span className = "mv1">BOOKANDOFFER GmbH</span>
    <span className = "mv1">Wattstrasse 11</span>
    <span className = "mv1">9012 St.Gallen</span>
    <span className = "mb3 mt1">info@bookandoffer.com</span>

    <span className = "mv1">Daten im Handelsregister</span>
    <span className = "mv1">Nummer: (in Gründung)</span>
    <span className = "mv1">Geschäftsführende: Ali Kamer Gündüz</span>
    <span className = "mv1">Handelsregisteramt St.Gallen</span>
    </div>
    <Footer />
  </div>
)


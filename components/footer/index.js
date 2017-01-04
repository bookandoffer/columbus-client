import { Component } from 'react'

export default class Footer extends Component {

  render () {
    return (
      <div className='layout vertical pa4 center mb0 sysFont' style={{'minHeight': '300px'}}>
        <div className = "layout vertical flex justify-start w-80">
          <div className='flex-1 b f5 mid-gray layout horizontal items-center mb4'><img src='/static/globe.svg' style={{'height': '30px', 'marginLeft': '25px', 'marginRight': '25px'}} />COLUMBUS</div>
          <div className='flex-1 layout horizontal'>
            <div className = "flex-1 layout vertical items-start">
              <p className = "courseTextPrimary f5 mb4">Columbus</p>
              <span className = "courseTextSecondary pointer mb2 f6">Details</span>
              <span className = "courseTextSecondary pointer mb2 f6">Richtlinien</span>
              <span className = "courseTextSecondary pointer mb2 f6">Hilfe</span>
            </div>
            <div className = "flex-1 layout vertical items-start">
              <p className = "courseTextPrimary f5 mb4">Entdecken</p>
              <span className = "courseTextSecondary pointer mb2 f6">Vertrauen & Sicherheit</span>
              <span className = "courseTextSecondary pointer mb2 f6">Weiterempfehlungen</span>
              <span className = "courseTextSecondary pointer mb2 f6">Reiseführer</span>
            </div>
            <div className = "flex-1 layout vertical items-start">
              <p className = "courseTextPrimary f5 mb4">Sprachkurse Anbieten</p>
              <span className = "courseTextSecondary pointer mb2 f6">Warum Sprachkurse einstellen?</span>
              <span className = "courseTextSecondary pointer mb2 f6">Vorraussetzungen</span>
              <span className = "courseTextSecondary pointer mb2 f6">Weiterempfehlungen</span>
            </div>
          </div>
          <div className="flex-1 courseTextPrimary h4 f6 justify-center items-center layout horizontal">AGB & Datenschutz | Impressum</div>
        </div>
      </div>
    )
  }
}

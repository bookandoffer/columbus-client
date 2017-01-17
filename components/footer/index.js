import { Component } from 'react'
import Link from 'next/link'

export default class Footer extends Component {

  render () {
    return (
      <div className='layout vertical pa4 center mb0 sysFont' style={{'minHeight': '200px'}}>
        <div className = "layout vertical flex justify-start w-80">
          <div className='flex courseTextPrimary f5 mid-gray layout horizontal items-center'>{/*<img src='/static/globe.svg' style={{'height': '30px', 'marginLeft': '25px', 'marginRight': '25px'}} />*/}bookandoffer</div>
          <div className='flex tc layout f6 c-767676 horizontal w-70 m-auto'>
            <div className = "flex-1"><Link href = '/impressum'><div className = "flex-1 helvetica pointer c-767676">Impressum</div></Link></div>
            <div className = "flex-1"><a href = "mailto:kontakt@bookandoffer.com"><div className = "flex-1 helvetica pointer c-767676">Kontakt</div></a></div>
            <div className = "flex-1"><a href = "/static/AGB_bookandoffer.docx"><div className = "flex-1 helvetica pointer c-767676">AGBs</div></a></div>
            <div className = "flex-1"><a href = "mailto:feedback@bookandoffer.com?Subject=Helfe%20uns%20bookandoffer%20besser%20zu%20machen"><div className = "flex-1 helvetica pointer c-767676">Feedback</div></a></div>
            <div className = "flex-1 helvetica pointer c-767676">
              <a href = "http://www.facebook.com/tryhackerbay" target="_blank"><img src = "/static/facebook.png" className = "mr3 pointer" style = {{height:"20px"}} /></a>
              <a href = "http://www.twitter.com/hackerbay" target="_blank"><img src = "/static/twitter.png" className = "pointer" style = {{height:"20px"}} /></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

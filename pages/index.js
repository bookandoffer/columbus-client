
import Head from 'next/head'
import Portal from 'react-portal'
console.log(Portal)
export default () => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link href='/static/tachyons.css' rel='stylesheet' />
      <link href='/static/flex.css' rel='stylesheet' />
      <link href='/static/global.css' rel='stylesheet' />
      <link href='/static/theme.css' rel='stylesheet' />
    </Head>

    <img width='112' className='pa5' src='https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png' alt='next.js' />
  </div>
)

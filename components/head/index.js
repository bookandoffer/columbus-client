import Head from 'next/head'

export default (props) => (
  <Head>
    <title>{props.title || 'bookandoffer'}</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
    <link href='/static/tachyons.css' rel='stylesheet' />
    <link href='/static/flex.css' rel='stylesheet' />
    <link href='/static/global.css' rel='stylesheet' />
    <link href='/static/theme.css' rel='stylesheet' />
  </Head>
)

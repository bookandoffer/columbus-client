import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

/**
 * Lokka
 */

export default new Lokka({
  transport: new Transport('http://graphql-swapi.parseapp.com/')
})

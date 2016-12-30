import graph from '../graph'

export default async (token) => {
  return await graph(`
  query {
    user {
      id
      email
      firstName
      lastName
      birthdate
      courses {
        id
        type
        country
        address
        addressSecondary
        city
        postal
        images
        description
        title
        price
        groupSize
        startDate
        startTime
        endDate
        duration
        interval
      }
    }
  }
  `, {}, {
    Authorization: `Bearer ${token}`
  })
}

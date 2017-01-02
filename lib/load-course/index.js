import graph from '../graph'

export default async (id) => {
  return await graph(`
  query getCourse ($id: ID) {
    course: Course (id: $id) {
      id
      address
      addressSecondary
      city
      country
      description
      duration
      endDate
      groupSize
      images
      interval
      postal
      price
      startDate
      startTime
      title
      type
    }
  }
  `, {
    id: id
  })
}

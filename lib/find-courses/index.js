import graph from '../graph'

export default async (params) => {
  return await graph(`
  query course ($query: String!, $location: String!, $date:DateTime!) {
  	courses: allCourses(orderBy:startDate_ASC filter:{ title_contains: $query, fullAddress_contains: $location, startDate_lte: $date, endDate_gte: $date  }){
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
  `, params)
}

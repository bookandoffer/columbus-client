import graph from '../graph'

export default async (params) => {
  params.category = params.category ? params.category.toUpperCase() : params.category
  return await graph(`
    query course ($category: COURSE_TYPE!) {
    	courses: allCourses(orderBy:startDate_ASC filter:{ type: $category }){
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

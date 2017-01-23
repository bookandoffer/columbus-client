import Graph from '../graph'
import poss from 'poss'
import get from 'dlv'

export default async function upsert (user, course) {
  if (course.id) return await update(user, course)
  else return await create(user, course)
}

async function create (user, course) {
  const [ err, res ] = await poss(Graph(`
    mutation createCourse (
      $address: String!,
      $addressSecondary: String,
      $city: String!,
      $country: String!,
      $description: String!,
      $duration: Int!,
      $endDate: DateTime!,
      $groupSize: Int!,
      $images: [String!],
      $interval: COURSE_INTERVAL!,
      $postal: String!,
      $price: Int!,
      $startDate: DateTime!,
      $startTime: String!,
      $title: String!,
      $type: COURSE_TYPE!,
      $fullAddress: String!,
      $userId: ID!
    ) {
      course: createCourse(
        address: $address,
        addressSecondary: $addressSecondary,
        city: $city,
        country: $country,
        description: $description,
        duration: $duration,
        endDate: $endDate,
        groupSize: $groupSize,
        images: $images,
        interval: $interval,
        postal: $postal,
        price: $price,
        startDate: $startDate,
        startTime: $startTime,
        title: $title,
        type: $type,
        fullAddress: $fullAddress,
        userId: $userId
      ) {
        id
      }
    }
  `, {
    address: course.address,
    addressSecondary: course.addressSecondary,
    city: course.city,
    country: course.country,
    description: course.description,
    duration: Number(course.duration),
    endDate: new Date(course.endDate).toISOString(),
    groupSize: Number(course.groupSize),
    images: course.images,
    interval: course.interval,
    postal: course.postal,
    price: Number(course.price),
    startDate: new Date(course.startDate).toISOString(),
    startTime: course.startTime,
    title: course.title,
    type: course.type,
    fullAddress: fullAddress(course),
    userId: user.id
  }))

  if (err) return [ err, null ]
  if (!get(res, 'course.id')) return [ new Error('unable to create course'), null ]
  else return [ null, res.id ]
}

async function update (user, course) {
  const [ err, res ] = await poss(Graph(`
    mutation updateCourse (
      $id: ID!,
      $address: String!,
      $addressSecondary: String,
      $city: String!,
      $country: String!,
      $description: String!,
      $duration: Int!,
      $endDate: DateTime!,
      $groupSize: Int!,
      $images: [String!],
      $interval: COURSE_INTERVAL!,
      $postal: String!,
      $price: Int!,
      $startDate: DateTime!,
      $startTime: String!,
      $title: String!,
      $type: COURSE_TYPE!,
      $fullAddress: String!,
      $userId: ID!
    ) {
      course: updateCourse (
        id: $id,
        address: $address,
        addressSecondary: $addressSecondary,
        city: $city,
        country: $country,
        description: $description,
        duration: $duration,
        endDate: $endDate,
        groupSize: $groupSize,
        images: $images,
        interval: $interval,
        postal: $postal,
        price: $price,
        startDate: $startDate,
        startTime: $startTime,
        title: $title,
        type: $type,
        fullAddress: $fullAddress,
        userId: $userId
      ) {
        id
      }
    }
  `, {
    id: course.id,
    address: course.address,
    addressSecondary: course.addressSecondary,
    city: course.city,
    country: course.country,
    description: course.description,
    duration: Number(course.duration),
    endDate: new Date(course.endDate).toISOString(),
    groupSize: Number(course.groupSize),
    images: course.images,
    interval: course.interval,
    postal: course.postal,
    price: Number(course.price),
    startDate: new Date(course.startDate).toISOString(),
    startTime: course.startTime,
    title: course.title,
    type: course.type,
    fullAddress: fullAddress(course),
    userId: user.id
  }))

  if (err) return [ err, null ]
  else if (res instanceof Error) return [ res, null ]
  else if (!get(res, 'course.id')) return [ new Error('unable to update course'), null ]
  else return [ null, res.id ]
}

function fullAddress (course) {
  return `${course.address} ${course.addressSecondary || ''} ${course.city}, ${course.country} ${course.postal}`
}

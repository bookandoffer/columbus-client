import cookies from 'next-cookies'
import loadUser from '../load-user'


export default async function auth (ctx) {
  const { token } = cookies(ctx)
  if (ctx.req && !token) {
    return ctx.res.writeHead(302, { Location: '/' })
  } else if (!token) {
    document.location.pathname = '/'
    return
  }

  const res = await loadUser(token)

  // @TODO figure out how we should handle this error
  if (res instanceof Error) {
    return ctx.res.writeHead(302, { Location: '/' })
  }

  return res.user
}

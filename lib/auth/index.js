import cookies from 'next-cookies'
import loadUser from '../load-user'
import redirect from '../redirect'

export default async function auth (ctx) {
  const { token } = cookies(ctx)
  if (!token) return redirect('/')

  const res = await loadUser(token)

  // @TODO figure out how we should handle this error
  if (res instanceof Error) {
    console.error(res)
    return redirect('/')
  }

  return res.user
}

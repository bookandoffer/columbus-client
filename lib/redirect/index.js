/**
 * Export the function
 */

export default redirect

/**
 * Initialize the function
 */

function redirect (ctx, path) {
  if (ctx.res) ctx.res.writeHead(302, { Location: path })
  else document.location.pathname = path
}

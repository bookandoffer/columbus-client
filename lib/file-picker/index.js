/**
 * Expose `FilePicker`
 */

module.exports = FilePicker

/**
 * Input template
 */

if (typeof window !== 'undefined') {
  var form = document.createElement('form')
  form.style.margin = '0px'
  form.innerHTML = '<input type="file" style="top: -1000px; position: absolute" aria-hidden="true">'
  document.body.appendChild(form)
  var input = form.childNodes[0]
}

/**
 * Already bound
 */

var bound = false

/**
 * Opens a file picker dialog.
 *
 * @param {Object} options (optional)
 * @param {Function} fn callback function
 * @api public
 */

function FilePicker (opts, fn) {
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }
  opts = opts || {}

  // multiple files support
  input.multiple = !!opts.multiple

  // directory support
  input.webkitdirectory = input.mozdirectory = input.directory = !!opts.directory

  // accepted file types support
  if (opts.accept == null) {
    delete input.accept
  } else if (opts.accept.join) {
    // got an array
    input.accept = opts.accept.join(',')
  } else if (opts.accept) {
    // got a regular string
    input.accept = opts.accept
  }

  // listen to change event (unbind old one if already listening)
  if (bound) input.removeEventListener('change', bound)
  input.addEventListener('change', onchange)
  bound = onchange

  function onchange (e) {
    fn(input.files, e, input)
    input.removeEventListener('change', onchange)
    bound = false
  }

  // reset the form
  form.reset()

  // trigger input dialog
  input.click()
}

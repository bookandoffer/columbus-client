import superagent from 'superagent'

export default send

async function send ({ from, to, subject, text, replyTo } = {}) {
  // TODO this should be moved into a lambda function
  // before launch and placed as an action in graph.cool
  const res = await superagent
    .post('https://cors-anywhere.herokuapp.com/https://api.mailgun.net/v3/mg.bookandoffer.com/messages')
    .type('form')
    .auth('api', 'key-ede8b80dfa500fa6a6ddcf53954c528d')
    .send({ from, to, subject, text, 'h:Reply-To': replyTo })

  if (!res.ok) return console.log(res.text)

  return res.body
}

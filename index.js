const url = require('url')
const fetch = require('node-fetch')
const qs = require('qs')

module.exports = async (req, res) => {
  const uri = url.parse(req.url)
  const query = qs.parse(uri.query)
  if (query.q) {
    const data = await fetch(`https://www.googleapis.com/youtube/v3/search?${qs.stringify({
      maxResults: '25',
      part: 'snippet',
      q: query.q,
      type: '',
      key: process.env.YOUTUBE_KEY
    })}`)
    // TODO use a specific origin here instead
    res.setHeader('Access-Control-Allow-Origin', '*')
    data.body.pipe(res)
  } else {
    res.statusCode = 400
    res.end()
  }
}

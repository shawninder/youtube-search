const url = require('url')
const fetch = require('node-fetch')
const qs = require('qs')

module.exports = async (req, res) => {
  const uri = url.parse(req.url)
  const query = qs.parse(uri.query)
  if (query.q) {
    const href = `https://www.googleapis.com/youtube/v3/search?${qs.stringify({
      maxResults: '25',
      part: 'snippet',
      q: query.q,
      pageToken: query.pageToken,
      type: '',
      key: process.env.YOUTUBE_KEY,
      // Get only embeddable results
      format: 5
    })}`
    // console.log('href', href)
    const data = await fetch(href)
    // TODO use a specific origin here instead
    res.setHeader('Access-Control-Allow-Origin', '*')
    data.body.pipe(res)
  } else {
    res.statusCode = 400
    res.end()
  }
}

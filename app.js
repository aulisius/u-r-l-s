const Koa = require('koa')
const logger = require('koa-logger')
const favicon = require('koa-favicon')
const compress = require('koa-compress')
const views = require('koa-views')
const serve = require('koa-static')
const helmet = require('koa-helmet')
const convert = require('koa-convert')
const bodyParser = require('koa-body')

const index = require('./routes/index')
const upload = require('./routes/upload')
const minify = require('./routes/minify')

let app = new Koa()
const PORT = process.env.PORT | 3000

app.use(views(__dirname + '/views', { extension: 'ejs' }))
    .use(serve(__dirname + '/public'))
    .use(favicon(__dirname + '/public/favicon.ico'))
    .use(convert(bodyParser()))
    .use(logger())
    .use(helmet())
    .use(index)
    .use(upload)
    .use(minify)
    .use(compress())

app.listen(PORT, () => console.log('Server started'))

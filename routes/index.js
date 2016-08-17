const quotes = require('prog-quote')()
const router = require('koa-router')()

router.get(
    '/',
    ctx => ctx.render('index', {
        block: quotes.next().value
    }).then(() => ctx.status = 200)
)

router.get(
    '/error',
    ctx => ctx.render('error')
)

module.exports = router.routes()

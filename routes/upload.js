const router = require('koa-router')()

router.get(
    '/upload',
    ctx => ctx.render('upload', {
        afterMinify: false
    }).then(() => ctx.status = 200)
)

module.exports = router.routes()

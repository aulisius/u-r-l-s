const router = require('koa-router')()

router.get(
  '/upload',
  async ctx => {
    await ctx.render('upload', { afterMinify: false })
    ctx.status = 200
  }
)

module.exports = router.routes()

const router = require('koa-router')()
const repos = require('../repo/redirects')

const db = require('pg-promise')({
  extend: db => db.redirects = repos(db)
})(process.env.DATABASE_URL)

router.post(
  '/minify',
  async (ctx, next) => {
    await next()
    ctx.status = 200
  },
  async ({ request, render }) => {
    try {
      let data = await db.redirects.find(request.body.alias)
      let newLink = data === null
      render('upload', {
        afterMinify: true,
        message: newLink ? 'New link generated' : 'Link already exists',
        link: request.body.alias,
        absoluteLink: `${process.env.HOSTNAME}:${process.env.PORT}/${request.body.alias}`
      })
      if (newLink) {
        await db.redirects.add(request.body)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

router.get(
  '/:alias',
  async ctx => {
    try {
      let link = await db.redirects.find(ctx.params.alias)
      ctx.redirect(
        link
          ? link.original
          : '/error'
      )
    } catch (error) {
      console.error(error)
      ctx.redirect('/error')
    }
  }
)

module.exports = router.routes()

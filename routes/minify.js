const router = require('koa-router')()
const repos = require('../repo/redirects')

const db = require('pg-promise')({
    extend: db => db.redirects = repos(db)
})(process.env.DATABASE_URL)

router.post(
    '/minify',
    (ctx, next) => next().then(() => ctx.status = 200),
    ({request, render, state}) => db.redirects
        .find(request.body.alias)
        .then(data => state.newLink = data === null)
        .then(() => render('upload', {
            afterMinify: true,
            message: state.newLink ? 'New link generated' : 'Link already exists',
            link: `${process.env.HOSTNAME}/${request.body.alias}`
        }))
        .then(() => state.newLink ? db.redirects.add(request.body) : {})
        .catch(console.error)
)

router.get(
    '/:alias',
    ctx => db.redirects
        .find(ctx.params.alias)
        .then(link => ctx.redirect(link ? link.original : '/error'))
)

module.exports = router.routes()

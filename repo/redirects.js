module.exports = db => ({
    add: link => db.none('INSERT INTO redirects(alias, original) VALUES(${alias}, ${original})', link),

    find: alias => db.oneOrNone('SELECT * FROM redirects WHERE alias LIKE $1', alias),

    all: () => db.any('SELECT * FROM redirects')
})

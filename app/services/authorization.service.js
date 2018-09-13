'use strict'

const crypto = require('crypto')

module.exports = {
    createCookies: _createCookies
}

function _createCookies(res, cookie) {
    let jsonCookie = JSON.stringify(cookie)
    let hashCookie = hasher9000(jsonCookie)

    let expiry = { maxAge: 365 * 24 * 60 * 60 * 1000 }
    res.cookie('auth', cookie, expiry)
    res.cookie('auth-hash', hashCookie, expiry)
}

function hasher9000(cookie) {
    let hash = crypto
        .pbkdf2Sync(cookie, process.env.HASH_KEY, 10000, 64, "sha256")
        .toString("base64")

    return hash
}


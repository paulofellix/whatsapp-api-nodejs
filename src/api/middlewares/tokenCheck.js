const config = require('../../config/config')

const ignorePaths = ['/status', '/qr']

function tokenVerification(req, res, next) {
    const bearer = req.headers.authorization
    const token = bearer?.slice(7)?.toString()
    const skip = ignorePaths.some((path) => req.path.includes(path))

    if (skip) {
        return next()
    }

    if (!token) {
        return res.status(403).send({
            error: true,
            message: 'no bearer token header was present',
        })
    }

    if (config.token !== token) {
        return res
            .status(403)
            .send({ error: true, message: 'invalid bearer token supplied' })
    }
    next()
}

module.exports = tokenVerification

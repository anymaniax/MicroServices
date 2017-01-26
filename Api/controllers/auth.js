let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.auth = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.AuthApi,
        method: "POST",
        json: true,
        headers: headers,
        body: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200)
            res.json(body);
        }
    });
}

module.exports.actu = (req, res) => {
    request.get(config.ProductApi + "cats/", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let token = JSON.parse(body)
            res.status(200)
            res.json(token);
        }
    });
}


module.exports.requireId = (req, res, next) => {
    let headers = {
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.AuthApi + "userid",
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                error: 'An unexpect error happened'
            })
        }
        if (!error && response.statusCode == 200) {
            let auth = JSON.parse(body)
            if (auth.success) {
                return next()
            }
        } else {
            res.status(401)
            return res.json({
                success: false,
                message: 'Failed to Authentication token.'
            });
        }
    });
}

module.exports.requireAdmin = (req, res, next) => {
    let headers = {
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.AuthApi + "admin",
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                error: 'An unexpect error happened'
            })
        }
        if (!error && response.statusCode == 200) {
            let auth = JSON.parse(body)
            if (auth.success) {
                return next()
            }
        } else {
            res.status(401)
            return res.json({
                success: false,
                message: 'Failed to Authentication token.'
            });
        }
    });
}
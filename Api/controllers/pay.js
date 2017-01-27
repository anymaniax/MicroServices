let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.pay = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.PayApi + req.params.id,
        method: "POST",
        json: true,
        headers: headers,
        body: req.body
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            if (body.success) {
                res.status(200)
                return res.json({
                    success: true,
                    url: body.url
                })
            }
        } else {
            res.status(500)
            return res.json('Could not create this transaction')
        }
    });
}

module.exports.getById = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.PayApi + "payements/" + req.params.id,
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let cart = JSON.parse(body)
            res.status(202)
            return res.json(cart)
        }
    });
}



module.exports.getByUserPayement = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.PayApi + "payements/user/" + req.params.id,
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let allPay = JSON.parse(body)
            res.status(202)
            return res.json(allPay)
        }
    });
}

module.exports.getAllPayement = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.PayApi + "payements/",
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let allPay = JSON.parse(body)
            res.statis(202)
            return res.json(allPay)
        }
    });
}
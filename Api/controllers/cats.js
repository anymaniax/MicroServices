let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.getAll = (req, res) => {
    request.get(config.ProductApi + "cats/", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let categories = JSON.parse(body)
            return res.json(categories)
        }
    });
}

module.exports.getAllWithDetails = (req, res) => {
    request.get(config.ProductApi + "cats/details", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let cats = JSON.parse(body)
            return res.json(cats)
        }
    });
}

module.exports.addCat = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.ProductApi + "cats/",
        method: "POST",
        json: true,
        headers: headers,
        body: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            res.status(201)
            res.send({
                body
            })
        }
    });
}

module.exports.getByCat = (req, res) => {
    request.get(config.ProductApi + "cats/" + req.params.cat, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let products = JSON.parse(body)
            return res.json(products)
        }
    });
}

module.exports.deleteCatCascade = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.delete({
        url: config.ProductApi + "cats/" + req.params.id,
        headers: headers
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let message = JSON.parse(body)
            console.log(message.success);
            if (message.success) {
                res.status(204)
                res.json({
                    success: true,
                    message: 'category deleted with success'
                })
            }
        } else {
            res.status(500)
            return res.json({
                err: "An unexpected error happened"
            })
        }
    });
}
let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.getAll = (req, res) => {
    request.get(config.ProductApi + "products/", function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let products = JSON.parse(body)
            res.status(200)
            return res.json(products)
        } else {
            res.status(404)
            res.json({
                err: "No products found :("
            })
        }
    });
}

module.exports.getById = (req, res) => {
    request.get(config.ProductApi + "products/" + req.params.id, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let product = JSON.parse(body)
            res.status(200)
            return res.json(product)
        } else {
            res.status(404)
            return res.json({
                error: "No product found for that id."
            })
        }
    });
}

module.exports.addProduct = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.ProductApi + "products/",
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
            res.status(201)
            return res.send({
                id: body.id,
                link: body.link
            })
        } else {
            res.status(406)
            return res.json({
                error: "Could not create this product"
            })
        }
    });
}

module.exports.delProduct = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.ProductApi + "products/" + req.params.id,
        method: "DELETE",
        json: true,
        headers: headers
    }, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            if (body.success) {
                res.status(204)
                res.json({
                    message: 'Product deleted with success'
                })
            }
        } else {
            res.status(500)
            return res.json({
                error: 'Could not remove this product :('
            })
        }
    });
}

module.exports.updateProduct = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.ProductApi + "products/" + req.params.id,
        method: "PUT",
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
            res.status(204)
            res.json({
                message: body.message,
                product: body.product
            })
        } else {
            res.status(500)
            return res.json('Could not update this product :(')
        }
    });
}

module.exports.search = (req, res) => {
    request.get(config.ProductApi + "products/search/" + req.params.query, function (error, response, body) {
        if (error) {
            res.status(500)
            return res.json({
                err: "An unexpect error happened"
            })
        }
        if (!error && response.statusCode == 200) {
            let products = JSON.parse(body)
            return res.json(products)
        } else {
            res.status(500)
            return res.json({
                error: 'Could not remove this product :('
            })
        }
    });
}
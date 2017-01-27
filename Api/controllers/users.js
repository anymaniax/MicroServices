let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.getAll = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.UserApi,
        headers: headers
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let allUsers = JSON.parse(body)
            return res.json(allUsers)
        }
    });
}

module.exports.getById = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request.get({
        url: config.UserApi + req.params.id,
        headers: headers
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let ByUser = JSON.parse(body)
            return res.json(ByUser)
        }
    });
}

module.exports.addUser = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi,
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
            res.status(200)
            return res.send({
                token: body.token,
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

module.exports.delUser = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi + req.params.id,
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
                res.end()
            }
        } else {
            res.status(500)
            return res.json({
                error: 'Could not remove this user :('
            })
        }
    });
}

module.exports.updateUser = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi + req.params.id,
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
            res.status(200)
            res.json({
                user: body.user,
                message: body.message
            })
        } else {
            res.status(500)
            return res.json('Could not update this user :(')
        }
    });
}

module.exports.updatePass = (req, res) => {
    let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi + "pass/" + req.params.id,
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
                res.status(204)
                return res.json({
                    success: true,
                    message: "Password updated with success"
                })
            }
        } else {
            res.status(500)
            return res.json('Could not update this user :(')
        }
    });
}

module.exports.makeAdmin = (req, res) => {
     let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi + "admins",
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
                    success: true
                })
            }
        } else {
            res.status(500)
            return res.json('Could not update this user :(')
        }
    });
}

module.exports.removeAdmin = (req, res) => {
     let headers = {
        'content-type': 'application/json',
        'x-access-token': req.headers['x-access-token']
    }
    request({
        url: config.UserApi + "admins",
        method: "DELETE",
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
                    success: true
                })
            }
        } else {
            res.status(500)
            return res.json('Could not update this user :(')
        }
    });
}
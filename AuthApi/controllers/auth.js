let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

let jwt = require('jsonwebtoken');
let request = require('request');
let bcrypt = require('bcryptjs');

const genJWT = (user, callback) => {
    const _userFields = {
        _id: user._id,
        lastname: user.lastname,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        sex: user.sex,
        phone: user.phone,
        address: {
            street: user.address.street,
            number: user.address.number,
            town: user.address.town,
            postalCode: user.address.postalCode,
            country: user.address.country
        },
        role: user.role
    }

    const token = jwt.sign(_userFields, config.secret, {
        expiresIn: "72h"
    })

    callback(token)
}

module.exports.genJWT = genJWT

module.exports.auth = (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    sucess: false,
                    message: 'Failed to Authentication token.'
                });

            } else {
                return res.json({
                    sucess: true,
                    message: 'Success to Authentication token.'
                });
            }
        });
    } else {
        request.post(config.UsersApi + "/" + req.body.username, {
            json: req.body
        }, function (error, response, body) {
            if (error) {
                console.log(error)
                res.status(500)
                return res.json({
                    error: "An unexpect error happened"
                })
            }
            if (!error && response.statusCode == 200) {
                genJWT(body.ByUser, token => {
                    res.status(200)
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                })
            } else {
                res.status(406)
                res.json({
                    success: false,
                    message: 'Authentication failed.'
                });
            }
        });
    }
}

module.exports.actu = (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    sucess: false,
                    message: 'Failed to Authentication token.'
                });

            } else {
                request.get(config.UsersApi + "/" + decoded._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let user = JSON.parse(body)
                        genJWT(user, token => {
                            res.status(200)
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token
                            });
                        })
                    }
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
}

module.exports.checkToken = (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to Authentication token.'
                });

            } else {
                req.decode = decoded;
                return res.json({
                    success: true,
                    message: 'Success to Authentication token.'
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}



module.exports.requireAdmin = (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to Authentication token.'
                });

            } else {
                req.decode = decoded;
                if (!req.decode || req.decode.role !== 'admin') {
                    return res.json({
                        success: false,
                        message: 'This route can only be accessed by an administrator'
                    });
                }
                return res.json({
                    success: true,
                    message: 'Welcome ' + req.decode.username
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports.requireId = (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(403)
                return res.json({
                    success: false,
                    message: 'Failed to Authentication token.'
                });

            } else {
                req.decode = decoded;
                if (req.decode && req.decode._id === req.params.id || req.decode.role === 'admin') {
                    res.status(200)
                    return res.json({
                        success: true,
                        message: 'Welcome ' + req.decode.username
                    });
                }
                res.status(403)
                return res.json({
                    success: false,
                    message: 'Failed to Authentication'
                })
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
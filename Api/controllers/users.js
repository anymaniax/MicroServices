let request = require('request')
let config
if (process.env.DEBUG == 1) {
    config = require('../config/dev')
} else {
    config = require('../config/prod')
}

module.exports.getAll = (req, res) => {
    request.get(config.UserApi, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            value
        }
    });
}

module.exports.getById = (req, res) => {
    
}

module.exports.addUser = (req, res) => {
    
}

module.exports.delUser = (req, res) => {
   
}

module.exports.updateUser = (req, res) => {
    
}

module.exports.updatePass = (req, res) => {
    
}

module.exports.makeAdmin = (req, res) => {
   
}

module.exports.removeAdmin = (req, res) => {
    
}
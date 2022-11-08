
const checkToken = require('./jsonToken')
function readeParams(req, resp, next) {

    let token = req.get("token");
    if(!token){
        resp.sendStatus(407)
    }
    let nextMiddle = checkToken.checkToken(token)
    console.log('midddd: ' + nextMiddle)
    if(!nextMiddle){  resp.sendStatus(401)}

    next()
}

exports.readeParams = readeParams
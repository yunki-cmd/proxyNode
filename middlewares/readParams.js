
const checkToken = require('./jsonToken')
function readeParams(req, resp, next) {

    let token = req.get("token");
    let uddid = req.get("idmobile");
    if(!token){
        resp.sendStatus(407)
    }
    let nextMiddle = checkToken.checkToken(token,uddid)
    console.log('midddd: ' + nextMiddle)
    if(!nextMiddle){  resp.sendStatus(401)}

    next()
}

function readSession(req, resp, next) {
    
    let token = req.get("token");
    let uddid = req.get("idmobile");
    if(!token){
        resp.sendStatus(407)
    }
    let nextMiddle = checkToken.checkToken(token,uddid)
    console.log('readSession uddid: ' + nextMiddle)
    if(!nextMiddle){  resp.sendStatus(401)}

    let idSession = req.params.idSession

    console.log("readSession")
    console.log("idSession: " + idSession)
    console.log("token: " + token)
    console.log("uddid: " + uddid)

    next()
}

exports.readeParams = readeParams
exports.readSession = readSession

const checkToken = require('./jsonToken')
function readeParams(req, resp, next) {

    let token = req.get("token");
    let uddid = req.get("idmobile");
    if(!token){
        return resp.sendStatus(407)
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
       return resp.sendStatus(407)
    }
    let nextMiddle = checkToken.checkToken(token,uddid)
    console.log('readSession uddid: ' + nextMiddle)
    if(!nextMiddle){  return resp.sendStatus(401)}

    let idSession = req.params.idSession

    console.log("readSession")
    console.log("idSession: " + idSession)
    console.log("token: " + token)
    console.log("uddid: " + uddid)

    next()
}

function readGrid(req, resp, next) {
    if(req.params.session){
        console.log('id session: ' + req.params.session)
    }

    if (req.body) {
        if(req.body.hasOwnProperty('desiredCapabilities')) {
            if(!req.body.desiredCapabilities.hasOwnProperty("accessKey")){
                console.log('unatorized')
                return resp.sendStatus(401)
            }
        const accessKey = req.body.desiredCapabilities.accessKey
        console.log('accessKey: ' + accessKey)
        delete req.body.desiredCapabilities.accessKey
        delete req.body.capabilities.firstMatch[0].accessKey
        }
    }
    next()
}

exports.readeParams = readeParams
exports.readSession = readSession
exports.readGrid = readGrid
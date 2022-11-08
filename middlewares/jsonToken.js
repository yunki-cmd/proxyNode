var jwt = require('jsonwebtoken');
const jsonDatos = require("../users.json")
const SECRET = 'taas'

function checkToken(token){

    const decode = jwt.verify(token, SECRET)
    if(!decode) return false
    /* console.log(body)
    let udidBody
    if(body.desiredCapabilities.platformName === 'iOS'){
      udidBody = body.desiredCapabilities['appium:udid']
      console.log('ios udid: ' + udidBody)
    } else {
      udidBody = body.desiredCapabilities['appium:devicesName']
      console.log('androdi udid: ' + udidBody)
    } */


    console.log('decode:' + decode.user)

    let userFound= jsonDatos.users.filter(element => {
        console.log('user: ' + JSON.stringify(element))
        return element.name === decode.user
    })

    let acceder = [];

    console.log(userFound)

    if(userFound.length > 0){
      return userFound[0].udid.some(r => decode.mobiles.includes(r))
    }

    return acceder.length > 0 ? true : false;
}

exports.checkToken = checkToken
var jwt = require('jsonwebtoken');
const jsonDatos = require("../users.json")
const SECRET = process.env.JSON_SECRET_KEY

function checkToken(token, uddid){

    const decode = jwt.verify(token, SECRET)
    if(!decode) return false
    /* let udidBody
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

    console.log(userFound)
    console.log(uddid)

    if(userFound.length > 0){
      return userFound[0].udid.includes(uddid)
    }

    return false;
}

exports.checkToken = checkToken
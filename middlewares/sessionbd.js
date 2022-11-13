
let sessionIDS = []

function existIdSession(idSession){
    if(sessionIDS.length ===0) return false

    const id = sessionIDS.filter(element => element.id === idSession
    )

    return id.length > 0 ?  true :  false
}

function updateSessionIds(ids){
    sessionIDS = ids
}

exports.updateSessionIds=updateSessionIds
exports.existIdSession=existIdSession
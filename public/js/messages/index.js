
const token = checkToken()

if(token){
    var socket = io({
        auth: {
            token
        }
    })
}else{
    console.log("token not available")
}

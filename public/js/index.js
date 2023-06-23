
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        tokenVerification()
    }, 3000)

})

const tokenVerification = async () => {
    const token = checkToken()
    if (token) {
        const res = await axios.get('/api/check-token', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            window.location.href = "./public/html/messages.html"
            return
        }
        window.location.href = "./public/html/login.html"
    }
    window.location.href = "./public/html/login.html"
    return 
}



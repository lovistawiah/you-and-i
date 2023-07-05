const usernameEmail = document.getElementById("usernameEmail")
const password = document.getElementById("password")
const form = document.getElementById("form")
const error = document.getElementById("error")

form.addEventListener("submit", async (e) => {
    let message = ""
    e.preventDefault()
    try {

        if (!usernameEmail.value || !password.value) {
            message = "all inputs required"
            showError(message)
            return
        }

        const res = await axios.post('/api/login', {
            usernameEmail: usernameEmail.value,
            password: password.value
        })

        const { data } = res
        if (!res.status == 200 && !data.message == "ok") {
            message = "Unknown error"
            showError(message)
            return
        }
        const { token } = data
        

        localStorage.setItem("youAndItoken", token)
        window.location.href = '/'
    } catch (err) {
        httpErrorLogger(err, showError)
    }

})

function showError(message) {
    error.style.visibility = "visible"
    error.innerText = message
    password.innerText = ""
}


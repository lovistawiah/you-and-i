const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const username = document.getElementById("username")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const form = document.getElementById("form")
const error = document.getElementById("error")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let message
    try {
        if (!firstName.value || !lastName.value || !email.value || !username.value || !password.value || !confirmPassword.value) {
            message = "all inputs are required"
            showError(message)
        }
        const res = await axios.post("/api/signup", {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            username: username.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        })

        const { data } = res
        if (data.message === "ok" && res.status === 200) {
            password.innerText = ""
            confirmPassword.innerText = ""
            window.location.href = '../html/login.html'
            return
        }
        return
    } catch (err) {
        httpErrorLogger(err,showError)
    }
})

function showError(message) {
    error.style.visibility = "visible"
    error.innerText = message
    password.innerText = ""
    confirmPassword.innerText = ""
}

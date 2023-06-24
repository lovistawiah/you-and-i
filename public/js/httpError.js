function httpErrorLogger(err,showError){
    if (err.response.status >= 400) {
        message = err.response.data.message
        showError(message)
        return
    }
}
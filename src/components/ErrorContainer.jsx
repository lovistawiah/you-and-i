
const ErrorContainer = ({ errorMessage }) => {
    return (
        errorMessage ? (
            <div className="text-red-500 border-[0.5px] p-1 border-red-300 rounded">{errorMessage}</div>
        ) : null
    )
}

export default ErrorContainer
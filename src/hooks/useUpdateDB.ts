import { useState } from "react"

export default function useUpdateDB() {
    const [, setUpdateDB] = useState(false)
    return { setUpdateDB }
}
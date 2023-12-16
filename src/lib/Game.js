export const formatDateString = (dateTimeString) => {
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ]

    const date = new Date(dateTimeString)
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const month = months[monthIndex]
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${day} ${month} в ${hours}:${minutes < 10 ? "0" : ""}${minutes}`
}

export const fileHandler = (file, setImageUrl) => {
    if (file) {
        setImageUrl(URL.createObjectURL(file))
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = (error) => {
            alert(`Error: ${error}`)
        }
    }
}
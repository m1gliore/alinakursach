export const convertCurrency = (currency, price) => {
    switch (currency) {
        case "USD":
            return `$${(price / 90).toFixed(2)}`
        case "EUR":
            return `€${(price / 98).toFixed(2)}`
        default:
            return `${price?.toFixed(2)}₽`
    }
}

export const convertToNumber = (value) => {
    const parsedValue = parseFloat(value.replace(/[^\d.-]/g, ''))
    return Number(parsedValue.toFixed(2))
}

export const currencySign = (currency, price) => {
    if (isNaN(price)) {
        switch (currency) {
            case "USD":
                return "$0.00"
            case "EUR":
                return "€0.00"
            default:
                return "0.00₽"
        }
    }

    switch (currency) {
        case "USD":
            return `$${price?.toFixed(2)}`
        case "EUR":
            return `€${price?.toFixed(2)}`
        default:
            return `${price}₽`
    }
}

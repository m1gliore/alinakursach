export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item?.priceProduct, 0)
}

export const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
}

export const updateQuantity = (games, itemId, actionType) => {
    return games.map((game) => {
        if (game.id === itemId) {
            let updatedQuantity = game.quantity

            if (actionType === "increase") {
                updatedQuantity++
            } else if (actionType === "decrease" && updatedQuantity > 0) {
                updatedQuantity--
            }

            if (updatedQuantity === 0) {
                return null
            } else {
                return {...game, quantity: updatedQuantity}
            }
        } else {
            return game
        }
    }).filter(Boolean)
}

export const addGameToCart = (games, gameToAdd) => {
    const existingProduct = games.find((product) => product.id === gameToAdd.id)

    if (existingProduct) {
        existingProduct.quantity++
    } else {
        games.push({ ...gameToAdd, quantity: 1 })
    }

    return games
}

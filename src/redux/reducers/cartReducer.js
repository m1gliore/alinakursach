import {createSlice} from '@reduxjs/toolkit';
import {addGame, clearCart, updateGameQuantity} from '../actions/cart';
import {HYDRATE} from "next-redux-wrapper";
import {addGameToCart, calculateTotalQuantity, updateQuantity} from "../../lib/Cart"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        games: [],
        quantity: 0,
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {...state, ...action.payload.cart}
            })
            .addCase(addGame.fulfilled, (state, action) => {
                const game = action.payload
                state.games = addGameToCart(state.games, game)
                state.quantity = calculateTotalQuantity(state.games)
                state.isLoading = false
                state.error = null
            })
            .addCase(addGame.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addGame.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(updateGameQuantity, (state, action) => {
                const {itemId, actionType} = action.payload;
                state.games = updateQuantity(state.games, itemId, actionType);
                state.quantity = calculateTotalQuantity(state.games);
            })
            .addCase(clearCart, (state) => {
                state.games = []
                state.quantity = 0
            })
    }
})

export default cartSlice
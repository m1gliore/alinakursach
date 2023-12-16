import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

export const addGame = createAsyncThunk('cart/addGame', async (game) => {
    return game
})

export const updateGameQuantity = createAction('cart/updateGameQuantity')

export const clearCart = createAction('cart/clearCart')
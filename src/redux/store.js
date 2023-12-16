import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import rootReducer from "./reducers/rootReducer";
import {createWrapper} from "next-redux-wrapper";
import createwebStorage from "redux-persist/lib/storage/createwebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        }
    }
}

const persistConfig = {
    key: 'root',
    storage: typeof window !== 'undefined' ? createwebStorage('session') : createNoopStorage()
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export const wrapper = createWrapper(() => store)

export const persistor = persistStore(store)

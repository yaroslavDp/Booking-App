import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import bookingsSlice from "./bookingsSlice/bookings-slice"
import tripsSlice from "./tripsSlice/trips-slice"
import authSlice from "./authSlice/auth-slice"


export const store = configureStore({
    reducer: {
        bookings: bookingsSlice,
        trips: tripsSlice,
        auth: authSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
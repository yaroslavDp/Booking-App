import axios from "axios";
import { BookTripBodyType } from "../../services/bookings/bookingsServiceType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "./bookings-slice-types";
import { BookType } from "../../types/BookingType";
import { ErrorType } from "../authSlice/auth-slice-types";
import { toast } from "react-toastify";
import bookingsService from "../../services/bookings/bookingsService";

const initialState: InitialStateType = {
    bookings: [],
    error: null,
    loading: false
}

export const getAllBookings = createAsyncThunk(
    'bookings/getAll', async(_, {rejectWithValue}) => {
        try {
            const { data } = await bookingsService.getBookings()
            return data
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const bookATrip = createAsyncThunk(
    'bookings/bookAtrip', async(body: BookTripBodyType, {rejectWithValue}) => {
        try {
            const { data } = await bookingsService.bookTrip(body)
            return data
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const deleteBookings = createAsyncThunk(
    'bookings/deleteBooking', async(bookingId:string, {rejectWithValue}) => {
      try {
        const response = await bookingsService.deleteBooking(bookingId);
        if(response){
            return bookingId
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data)
        }
      }
    }
)

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        clearErrors:(state) => {
            state.error = null
        },
    },
    extraReducers: {
        [getAllBookings.fulfilled.type]: (state, action:PayloadAction<BookType[]>) => {
            state.bookings = action.payload
            state.loading = false
        },
        [getAllBookings.pending.type]: (state) => {
            state.loading = true
        },
        [getAllBookings.rejected.type]: (state, action:PayloadAction<ErrorType>) => {
            state.loading = false
            state.error = action.payload
            toast.error('Error! Couldn\'t fetch bookings:(', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
        [bookATrip.fulfilled.type]: (state, action:PayloadAction<BookType>) => {
            state.bookings = [...state.bookings, action.payload] 
            state.loading = false
            toast.success('Trip was successfully booked!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
        [bookATrip.pending.type]: (state) => {
            state.loading = true
        },
        [bookATrip.rejected.type]: (state, action:PayloadAction<ErrorType>) => {
            state.loading = false
            state.error = action.payload
            toast.error('Error! Couldn\'t book a trip:(', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
        [deleteBookings.fulfilled.type]: (state, action:PayloadAction<string>) => {
            state.bookings = state.bookings.filter(item => item.id !== action.payload)
            state.loading = false
            toast.success('Trip was successfully deleted!', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
        [deleteBookings.pending.type]: (state) => {
            state.loading = true
        },
        [deleteBookings.rejected.type]: (state, action:PayloadAction<ErrorType>) => {
            state.loading = false
            state.error = action.payload
            toast.error('Error! Couldn\'t delete a booking:(', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
    }
})
export const {clearErrors} = bookingsSlice.actions;
export default bookingsSlice.reducer
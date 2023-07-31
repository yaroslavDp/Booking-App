import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType } from "./trips-slice-types";
import { ErrorType } from "../authSlice/auth-slice-types";
import { TripItemType } from "../../types/TripType";
import axios from "axios";
import tripsService from '../../services/trips/tripsService';
import { toast } from "react-toastify";

const initialState: InitialStateType = {
    fetchedTrips: [],
    filteredTrips: [],
    trip: null,
    error: null,
    loading: false
}

export const getAllTrips = createAsyncThunk(
    'trips/getAll', async(_, {rejectWithValue}) => {
        try {
            const { data } = await tripsService.getTrips();
            return data
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const getTripById = createAsyncThunk(
    'trips/getById', async( id: string, {rejectWithValue}) => {
        try {
            const { data } = await tripsService.getTripById(id);
            return data
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        clearErrorsTrips: (state) => {
            state.error = null
        },
        changeFilteredTrips: (state, action: PayloadAction<TripItemType[]>)  =>{
            state.filteredTrips = action.payload
        },
    },
    extraReducers: {
        [getAllTrips.fulfilled.type]: (state, action: PayloadAction<TripItemType[]>) => {
            state.fetchedTrips = action.payload;
            state.filteredTrips = action.payload;
            state.loading = false;
        },
        [getAllTrips.pending.type]: (state) => {
            state.loading = true;
        },
        [getAllTrips.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
            state.error = action.payload;
            state.loading = false;
            toast.error('Error! Couldn\'t fetch trips:(', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
        [getTripById.fulfilled.type]: (state, action: PayloadAction<TripItemType>) => {
            state.trip = action.payload
            state.loading = false;
        },
        [getTripById.pending.type]: (state) => {
            state.loading = true;
        },
        [getTripById.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
            state.error = action.payload;
            state.loading = false;
            toast.error('Error! Couldn\'t fetch a trip:(', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        },
    }
})
export const { clearErrorsTrips, changeFilteredTrips } = tripsSlice.actions
export default tripsSlice.reducer
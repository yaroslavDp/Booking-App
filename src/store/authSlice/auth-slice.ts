import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthBodyType, UserRegisterBodyType } from "../../services/auth/authServiceType";
import { AuthStateType, ErrorType } from "./auth-slice-types";
import authService from "../../services/auth/authService";
import { AuthType, getAuthUser } from "../../types/authType";
import { RootState } from "../store";
import { toast } from "react-toastify";

const initialState: AuthStateType = {
    auth: false,
    email: '',
    userId: null,
    fullName: '',
    password: '',
    error: null,
    loading: false
  
}

export const signIn = createAsyncThunk(
    'auth/signIn', async (_, {rejectWithValue, getState}) => {
        const state = (getState() as RootState).auth;
        try {
            const body: UserAuthBodyType = {
                email: state.email,
                password: state.password
            };
            const {data} = await authService.auth(body)
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp', async (_, {rejectWithValue, getState}) => {
        const state = (getState() as RootState).auth;
        try {
            const body: UserRegisterBodyType = {
                fullName: state.fullName,
                email: state.email,
                password: state.password
            };
            const {data} = await authService.register(body)
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser', async (_, { rejectWithValue }) => {
      try {
        const { data } = await authService.getAuthUser();
        return data
      } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data)
        }
      }
    }
  )
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      changeEmail:(state, action: PayloadAction<string>) => {
        state.email = action.payload
        state.error = null
      },
      changeName:(state, action: PayloadAction<string>) => {
        state.fullName = action.payload
        state.error = null
      },
      changePassword:(state, action: PayloadAction<string>) => {
        state.password = action.payload
        state.error = null
      },
      exit:(state) => {
        state.auth = false,
        state.error = null
        state.loading = false
        localStorage.clear()
      },
      toggleAuth:(state, action: PayloadAction<boolean>) => {
        state.auth = action.payload
      }
  
    },
    extraReducers: {
      [signIn.fulfilled.type]: (state, action: PayloadAction<AuthType>) => {
        localStorage.setItem('access_token', JSON.stringify(action.payload.token))
        state.email = ''
        state.userId = action.payload.user.id
        state.password = ''
        state.error = null
        state.auth = true
        state.loading = false
        state.fullName = action.payload.user.fullName
      },
      [signIn.pending.type]: (state) => {
        state.loading = true
      },
      [signIn.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
        state.error = action.payload;
        state.auth = false
        state.loading = false
        toast.error('Error! There is no such user!', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      },
      [signUp.fulfilled.type]: (state, action: PayloadAction<AuthType>) => {
        localStorage.setItem('access_token', JSON.stringify(action.payload.token))
        state.email = ''
        state.userId = action.payload.user.id
        state.password = ''
        state.error = null
        state.auth = true
        state.loading = false
        state.fullName = action.payload.user.fullName
      },
      [signUp.pending.type]: (state) => {
        state.loading = true
      },
      [signUp.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
        state.error = action.payload
        state.auth = false
        state.loading = false
        toast.error('Error! Something went wrong with authentication:(', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      },
      [getUser.fulfilled.type]: (state, action: PayloadAction<getAuthUser>) => {
        state.userId = action.payload.id
        state.fullName = action.payload.fullName
      },
      [getUser.pending.type]: (state) => {
        state.loading = true
      },
      [getUser.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
        state.error = action.payload
        state.auth = false
        state.loading = false
      },
  
    }
})
export const { changeEmail,
    changePassword,
    exit,
    toggleAuth,
    changeName,
  } = authSlice.actions;
export default authSlice.reducer
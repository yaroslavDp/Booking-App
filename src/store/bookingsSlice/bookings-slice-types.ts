import { BookType } from "../../types/BookingType";
import { ErrorType } from "../authSlice/auth-slice-types";

export interface InitialStateType {
    bookings: BookType[] | [],
    error: ErrorType | null,
    loading: boolean
  }
  
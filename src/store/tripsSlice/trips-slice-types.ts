import { ErrorType } from "../authSlice/auth-slice-types";
import { TripItemType } from "../../types/TripType";

export interface InitialStateType {
    trip: TripItemType | null;
    fetchedTrips: TripItemType[];
    filteredTrips: TripItemType[];
    error: ErrorType | null;
    loading: boolean;
}
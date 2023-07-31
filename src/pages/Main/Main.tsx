import React, { useEffect } from "react";
import { TripItemType } from "../../types/TripType";
import MainSection from "../../components/MainSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import TripList from "../../components/Trip/TripList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllTrips, changeFilteredTrips, clearErrorsTrips } from "../../store/tripsSlice/trips-slice";
import { exit } from "../../store/authSlice/auth-slice";
import { clearErrors } from "../../store/bookingsSlice/bookings-slice";

const Main:React.FC = () => {
    const dispatch = useAppDispatch();
    const {fetchedTrips, filteredTrips, loading, error} = useAppSelector(state => state.trips);

    const handleFilteredTrips = (trips:TripItemType[]) => {
        dispatch(changeFilteredTrips(trips))
    }
    const onError = () => {
        console.log('Error')
        dispatch(clearErrors())
        dispatch(clearErrorsTrips())
        dispatch(exit())
    }

    useEffect(() => {
        dispatch(getAllTrips())
    }, [dispatch])
    return (
        <>
        {error && error?.statusCode === 401 ? onError() : <MainSection className="main">
        { loading ? <Loader/> : <>
        <SearchBar trips={fetchedTrips} onChangeFilter={handleFilteredTrips} />
        <TripList trips={filteredTrips} />
            </>}
        </MainSection>}
        </>
    )
}

export default Main;
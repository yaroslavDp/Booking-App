import React, {useEffect} from "react";
import MainSection from "../../components/MainSection";
import Loader from "../../components/Loader/Loader";
import BookingList from "../../components/Booking/BookingList";
import { clearErrors, deleteBookings, getAllBookings } from "../../store/bookingsSlice/bookings-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { exit } from "../../store/authSlice/auth-slice";
import { clearErrorsTrips } from "../../store/tripsSlice/trips-slice";

const Bookings:React.FC = () => {
    const dispatch = useAppDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(deleteBookings(id));
    };
    const onError = () => {
        console.log('Error')
        dispatch(clearErrors())
        dispatch(clearErrorsTrips())
        dispatch(exit())
    }
    const {bookings, loading, error } = useAppSelector(state=> state.bookings);
    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    return (
        <>
            {error && error?.statusCode === 401 ? onError() : <MainSection className="bookings-page">
                {loading ? <Loader/> :<BookingList bookingList={bookings} setBookingList={handleRemoveItem}/>}
            </MainSection>}
        </>
    )
}

export default Bookings;
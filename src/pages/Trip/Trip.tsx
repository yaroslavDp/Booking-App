import React, {useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { bookATrip, clearErrors } from "../../store/bookingsSlice/bookings-slice";
import { BookTripBodyType } from "../../services/bookings/bookingsServiceType";
import { clearErrorsTrips, getTripById } from "../../store/tripsSlice/trips-slice";
import MainSection from "../../components/MainSection";
import Button from "../../components/Button/Button";
import ModalBookTrip from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import { exit } from "../../store/authSlice/auth-slice";


const Trip:React.FC = () => {
    const { tripId } = useParams();
    const dispatch = useAppDispatch();
    const { trip, loading, error } = useAppSelector(state => state.trips);
    const { userId } = useAppSelector(state => state.auth);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    const handleShowModal = useCallback(() => {
        setShowModal(true);
      }, []);
    const handleHideModal = useCallback(() => {
        setShowModal(false);
    }, []);
    const onError = () => {
        console.log('Error')
        dispatch(clearErrors())
        dispatch(clearErrorsTrips())
        dispatch(exit())
    }
    useEffect(() => {
        dispatch(getTripById(String(tripId)))
    }, [dispatch, tripId])

    const handleOnSubmit = async (date:string, guests:number) => {
        const body:BookTripBodyType = {
            tripId: String(tripId),
            guests: guests,
            date: date,
            userId:String(userId)
          }
         await dispatch(bookATrip(body));
            handleHideModal();
    }
    return (
    <>
        {error && error?.statusCode === 401 ? onError() : <MainSection className="trip-page">
            { loading ? <Loader/> : trip && <div className="trip">
                <img
                data-test-id="trip-details-image"
                src={trip.image}
                className="trip__img"
                alt="trip photo"
                />
                <div className="trip__content">
                    <div className="trip-info">
                        <h3 data-test-id="trip-details-title" className="trip-info__title">
                        {trip.title}
                        </h3>
                        <div className="trip-info__content">
                        <span
                            data-test-id="trip-details-duration"
                            className="trip-info__duration"
                        >
                            <strong>{trip.duration}</strong> days
                        </span>
                        <span data-test-id="trip-details-level" className="trip-info__level">
                            {trip.level}
                        </span>
                        </div>
                    </div>
                    <div
                        data-test-id="trip-details-description"
                        className="trip__description"
                    >
                        {trip.description}
                    </div>
                    <div className="trip-price">
                        <span>Price</span>
                        <strong
                        data-test-id="trip-details-price-value"
                        className="trip-price__value"
                        >
                        {trip.price} $
                        </strong>
                    </div>
                    <Button
                        data="trip-details-button"
                        type="button"
                        title="Book a trip"
                        styles="trip__button"
                        onClick={handleShowModal}
                    />
                </div>
            </div>
            }
        </MainSection>}
        {showModal && trip && (<ModalBookTrip
          title={trip.title}
          price={trip.price}
          tripId={tripId ? tripId : "1"}
          duration={trip.duration}
          level={trip.level}
          onClose={handleHideModal}
          formSubmit = {handleOnSubmit}
          />
       
      )}
    </>
    )
}

export default Trip;

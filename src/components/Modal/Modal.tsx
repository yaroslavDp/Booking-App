import React, { useState } from "react";
import Button from "../Button/Button";
import { getDate } from "../../helpers/dateHelper";
import { useAppSelector } from "../../store/store";
import './Modal.css';
import Loader from "../Loader/Loader";
interface ModalTripProps {
    title: string;
    price: number;
    tripId: string;
    duration: number;
    level: string;
    onClose: () => void;
    formSubmit: (date:string, numOfGuests:number) => void
  }

const ModalBookTrip:React.FC<ModalTripProps> = ({ title, price, duration, level, onClose, formSubmit }) => {
    const {futureDay, time} = getDate();
    const [date, setDate] = useState<string>(futureDay);
    const [numOfGuests, setNumOfGuests] = useState<string>('1');
    const {loading} = useAppSelector(state => state.bookings);
    const handleGuestsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumOfGuests(e.target.value);
    };

    const handleDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        formSubmit([date, time].join('T'), Number(numOfGuests))
    }

    return (
        <>
            <div className="modal">
                <div data-test-id="book-trip-popup" className="book-trip-popup">
                    <button
                        data-test-id="book-trip-popup-close"
                        className="book-trip-popup__close"
                        disabled={loading ? true : false }
                        onClick={onClose}
                    >
                        ×
                    </button>
                    {loading ? <Loader/> :<form className="book-trip-popup__form" autoComplete="off" onSubmit={handleOnSubmit}>
                        <div className="trip-info">
                            <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                                {title}
                            </h3>
                            <div className="trip-info__content">
                                <span
                                data-test-id="book-trip-popup-duration"
                                className="trip-info__duration"
                                >
                                <strong>{duration}</strong> days
                                </span>
                                <span
                                data-test-id="book-trip-popup-level"
                                className="trip-info__level"
                                >
                                {level}
                                </span>
                            </div>
                        </div>
                        <label className="input">
                            <span className="input__heading">Date</span>
                            <input
                                data-test-id="book-trip-popup-date"
                                name="date"
                                type="date"
                                value={date}
                                min={date}
                                onChange={handleDateOnChange}
                                required 
                            />
                        </label>
                        <label className="input">
                            <span className="input__heading">Number of guests</span>
                            <input
                                data-test-id="book-trip-popup-guests"
                                name="guests"
                                type="number"
                                min="1"
                                max="10"
                                value={numOfGuests}
                                onChange={handleGuestsOnChange}
                                required
                            />
                        </label>
                        <span className="book-trip-popup__total">
                            Total:
                            <output
                                data-test-id="book-trip-popup-total-value"
                                className="book-trip-popup__total-value"
                            >
                                {price * Number(numOfGuests)} $
                            </output>
                        </span>
                        <Button title="Book a trip" data="book-trip-popup-submit" type="submit"/>
                    </form>}
                </div>
            </div>
        </>
    )
}

export default ModalBookTrip;
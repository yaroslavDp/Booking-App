import React from "react";
import { BookType } from "../../../types/BookingType";
import './BookingItem.css';
import { withoutdashes } from "../../../helpers/dateConverter";

interface BookingsItemProps {
    item: BookType;
    onRemove: (id: string) => void;
}

const BookingItem:React.FC<BookingsItemProps> = ({item, onRemove}) => {
    const handleOnRemove = () => onRemove(item.id);

    const formatDate = (date: string) => {

        const myDate = withoutdashes(date);
       
        const [day, month, year] = myDate.split('.');
      
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
      
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      
        return formattedDate;
      }
    return (
        <>
            <li data-test-id="booking" className="booking">
            <h3 data-test-id="booking-title" className="booking__title">{item.trip.title}</h3>
            <span data-test-id="booking-guests" className="booking__guests">
                {item.guests} guests
            </span>
            <span data-test-id="booking-date" className="booking__date">
                {formatDate(item.date)}
            </span>
            <span data-test-id="booking-total" className="booking__total">
                {item.trip.price * item.guests} $
            </span>
            <button
                data-test-id="booking-cancel"
                className="booking__cancel"
                title="Cancel booking"
                onClick={handleOnRemove}
            >
                <span className="visually-hidden">Cancel booking</span>
                ×
            </button>
            </li>
        </>
    )
}

export default BookingItem;
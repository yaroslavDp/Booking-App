import React from "react";
import BookingItem from "./BookingItem/BookingItem";
import { BookType } from "../../types/BookingType";
import './BookingList.css';

interface BookingListProps {
    bookingList: BookType[];
    setBookingList: (id: string) => void;
}
const BookingList: React.FC<BookingListProps> = ({ bookingList, setBookingList }) => {
    const bookings = [...bookingList]
    const sortedBookings = bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return (
      <ul className="bookings__list">
        {sortedBookings && sortedBookings.map((item) => <BookingItem key={item.id} item={item} onRemove={setBookingList} />)}
      </ul>
    );
  };
  
  export default BookingList;

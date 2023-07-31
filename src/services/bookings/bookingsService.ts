import { BookTripBodyType, BookingsRequestsType } from "./bookingsServiceType";
import { fetchAxios } from "../configureAxios";

class BookingsService implements BookingsRequestsType {

    getBookings () {
        return fetchAxios.get('/bookings')
    }
    bookTrip(body: BookTripBodyType){
        return fetchAxios.post('/bookings', body)
    }
    deleteBooking (bookingId: string): Promise<string>{
        return fetchAxios.delete(`/bookings/${bookingId}`);
    }
}

export default new BookingsService()
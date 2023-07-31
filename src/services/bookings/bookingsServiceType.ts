/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookTripBodyType {
    tripId: string
    userId: string
    guests: number
    date: string
  
}

export interface BookingsRequestsType {
    getBookings: () => Promise<any>
    bookTrip: (body: BookTripBodyType) => Promise<any>
    deleteBooking: (bookingId: string) => Promise<string>
}
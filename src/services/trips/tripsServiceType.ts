/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TripsRequestsType {
    getTrips: () =>  Promise<any>
    getTripById: (id:string) => Promise<any>
}
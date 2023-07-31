import { TripsRequestsType } from "./tripsServiceType";
import { fetchAxios } from "../configureAxios";


class TripsService implements TripsRequestsType {

    getTrips(){
        return fetchAxios.get('/trips');
    }
    getTripById(id:string) {
        return fetchAxios.get(`/trips/${id}`)
    }
}

export default new TripsService()
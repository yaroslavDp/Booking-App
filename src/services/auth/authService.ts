import { UserAuthBodyType, UserRegisterBodyType, AuthRequestTypes } from "./authServiceType";
import { fetchAxios } from "../configureAxios";

class AuthService implements AuthRequestTypes {

    getAuthUser(){
        return fetchAxios.get('auth/authenticated-user');
    }
    register(body: UserRegisterBodyType) {
        return fetchAxios.post('/auth/sign-up', body)
    }
    auth(body:UserAuthBodyType) {
        return fetchAxios.post('/auth/sign-in', body)
    }
}

export default new AuthService()
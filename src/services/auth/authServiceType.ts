/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserAuthBodyType {
    email: string;
    password: string;
}

export interface UserRegisterBodyType {
    fullName: string;
    email: string;
    password: string;
}

export interface AuthRequestTypes {
    auth(body: UserAuthBodyType): Promise<any>;
    register(body: UserRegisterBodyType): Promise<any>;
    getAuthUser(): Promise<any>;
}
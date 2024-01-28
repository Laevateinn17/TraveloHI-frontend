import { Gender } from "../enums/Gender"


export interface Passenger {
    firstName: string
    middleName: string
    lastName: string
    gender: Gender
    dateOfBirth: string
}
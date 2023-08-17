import { DOCTOR_REPOSITORY } from '../../constants/index';
import { Doctor } from './doctor.model';

export const doctorsProvider = [
    {
        provide: DOCTOR_REPOSITORY,
        useValue: Doctor,
    },
];

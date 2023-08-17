import { APPOINTMENT_REPOSITORY } from '../../constants';
import { Appointment } from './appointment.model';

export const appointmentsProviders = [
    {
        provide: APPOINTMENT_REPOSITORY,
        useValue: Appointment,
    },
];

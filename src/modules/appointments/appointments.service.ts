import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../core/constants';
import { Appointment } from '../../core/models/appointments/appointment.model';
import * as uuid from 'uuid';

@Injectable()
export class AppointmentsService {
    constructor(@Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: typeof Appointment) {}

    create(newAppointment): Promise<Appointment> {
        return this.appointmentRepository.create<Appointment>(newAppointment);
    }

    bookAppointment(userId: string, doctorId: string, slot: string): Promise<Appointment> {
        return this.create({
            id: uuid.v4(),
            userId,
            doctorId,
            slot,
        });
    }
}

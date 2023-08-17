import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { appointmentsProviders } from '../../core/models/appointments/appointment.provider';
import { DoctorsService } from '../doctors/doctors.service';
import { doctorsProvider } from '../../core/models/doctors/doctor.provider';

@Module({
    controllers: [AppointmentsController],
    providers: [AppointmentsService, ...appointmentsProviders, ...doctorsProvider, DoctorsService],
})
export class AppointmentsModule {}

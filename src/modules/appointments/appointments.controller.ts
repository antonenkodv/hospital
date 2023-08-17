import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { BookAppointmentDto } from './dtos/book.appointment.dto';
import { DoctorsService } from '../doctors/doctors.service';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly doctorsService: DoctorsService,
    ) {}

    @Post('book')
    async bookAppointment(@Body() body: BookAppointmentDto): Promise<any> {
        const { userId, doctorId, slot } = body;

        const isSlotExist = await this.doctorsService.isSlotExists(doctorId, slot);
        if (!isSlotExist) throw new ForbiddenException('Slot does not exist');

        const { dataValues } = await this.appointmentsService.bookAppointment(userId, doctorId, slot);
        await this.doctorsService.removeSlot(doctorId, slot);

        return { message: 'Appointment booked successfully', appointment: dataValues };
    }
}

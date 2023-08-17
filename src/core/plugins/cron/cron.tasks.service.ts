import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY, USER_REPOSITORY } from '../../constants';
import { User } from '../../models/users/user.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Appointment } from '../../models/appointments/appointment.model';
import { Op } from 'sequelize';
import { addHours, differenceInMilliseconds } from 'date-fns';
import { NotificationService, ReminderType } from '../../../modules/notifications/notification.service';
import { Doctor } from '../../models/doctors/doctor.model';

@Injectable()
export class CronTasksService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: typeof Appointment,
        private readonly notificationService: NotificationService,
    ) {}

    @Cron(CronExpression.EVERY_HOUR)
    async twoHourlyCron() {
        const dateNow = new Date();
        const startTime = addHours(dateNow, 2);
        const endTime = addHours(dateNow, 4);
        await this.handleCron(dateNow, startTime, endTime);
    }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async dailyCron() {
        const dateNow = new Date();
        const startTime = addHours(dateNow, 24);
        const endTime = addHours(dateNow, 48);
        await this.handleCron(dateNow, startTime, endTime);
    }
    async handleCron(dateNow: Date, startTime: Date, endTime: Date): Promise<void> {
        const appointments = await this.getAppointmentsBetweenDate(dateNow, startTime, endTime);
        for (const appointment of appointments) {
            const { user, doctor, slot } = appointment;
            const timeDiff = differenceInMilliseconds(appointment.slot, startTime);
            setTimeout(
                () => this.notificationService.sendReminder(user, doctor, slot, ReminderType.TWO_HOURS),
                timeDiff,
            );
        }
    }

    getAppointmentsBetweenDate(dateNow: Date, startTime: Date, endTime: Date): Promise<Appointment[]> {
        return this.appointmentRepository.findAll({
            where: {
                slot: {
                    [Op.between]: [startTime, endTime],
                },
            },
            include: [
                { model: Doctor, as: 'doctor' },
                { model: User, as: 'user' },
            ],
        });
    }
}

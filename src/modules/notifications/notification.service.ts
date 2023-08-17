import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { User } from '../../core/models/users/user.model';
import { Doctor } from '../../core/models/doctors/doctor.model';
import { format } from 'date-fns';

export enum ReminderType {
    TWO_HOURS = 'two_hours',
    ONE_DAY = 'one_day',
}

@Injectable()
export class NotificationService {
    private logFilePath = 'reminders.log';

    private appendToLog(message: string) {
        const formattedMessage = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')} | ${message}\n`;
        fs.appendFileSync(this.logFilePath, formattedMessage);
    }

    async sendReminder(user: User, doctor: Doctor, slot: Date, type: ReminderType) {
        try {
            const message: Record<ReminderType, string> = {
                [ReminderType.ONE_DAY]: `Привет ${user.name}! Напоминаем что вы записаны к ${doctor.spec} завтра в
         ${format(slot, 'HH:mm')}!`,
                [ReminderType.TWO_HOURS]: `Привет ${user.name}! Вам через 2 часа к ${doctor.spec} в ${format(
                    slot,
                    'HH:mm',
                )}!`,
            };
            await this.appendToLog(message[type]);
        } catch (e) {
            console.log(e);
        }
    }
}

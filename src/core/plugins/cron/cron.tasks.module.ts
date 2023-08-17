import { Module } from '@nestjs/common';
import { appointmentsProviders } from '../../models/appointments/appointment.provider';
import { CronTasksService } from './cron.tasks.service';
import { usersProviders } from '../../models/users/user.provider';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from '../../../modules/notifications/notification.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [...appointmentsProviders, ...usersProviders, CronTasksService, NotificationService],
})
export class CronTasksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/database/database.provider';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { CronTasksModule } from './core/plugins/cron/cron.tasks.module';

@Module({
    imports: [
        DatabaseProvider,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        AppointmentsModule,
        CronTasksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

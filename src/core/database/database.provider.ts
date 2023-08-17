import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/types/sequelize';
import { ISequelizeConfig } from './interfaces/database.condig.interface';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/users/user.model';
import { Doctor } from '../models/doctors/doctor.model';
import { Appointment } from '../models/appointments/appointment.model';

export const DatabaseProvider = SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<ISequelizeConfig> => {
        return {
            dialect: configService.get<string>('DB_DIALECT') as Dialect,
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            models: [User, Doctor, Appointment],
            synchronize: true,
        };
    },
    inject: [ConfigService],
});

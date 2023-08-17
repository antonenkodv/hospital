import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class BookAppointmentDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsDateString()
    slot: string;
}

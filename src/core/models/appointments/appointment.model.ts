import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Doctor } from '../doctors/doctor.model';
import { User } from '../users/user.model';

@Table
export class Appointment extends Model<Appointment> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User, 'userId')
    user: User;

    @ForeignKey(() => Doctor)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    doctorId: string;

    @BelongsTo(() => Doctor, 'doctorId')
    doctor: Doctor;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    slot: Date;
}

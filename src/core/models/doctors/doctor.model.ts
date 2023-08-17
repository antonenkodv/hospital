import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum Speciality {
    THERAPIST = 'therapist',
    DENTIST = 'dentist',
    SURGEON = 'surgeon',
}

@Table
export class Doctor extends Model<Doctor> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.ENUM(...Object.values(Speciality)),
        unique: false,
        allowNull: false,
    })
    spec: Speciality;

    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    slots: string[];
}
